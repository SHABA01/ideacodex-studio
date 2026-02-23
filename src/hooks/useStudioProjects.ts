import { useState, useEffect } from "react";
import type {
  StudioProject,
  StudioBlock,
  ModeSession,
} from "../components/studio/types/studio";
import { modes } from "../modes/modeConfig";

const STORAGE_KEY = "ideacodex-project";

function loadProjectFromStorage(): StudioProject | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // 🧠 Migration Guard
    const isOldStructure =
      Array.isArray(parsed?.conversations?.[Object.keys(parsed.conversations || {})[0]]);

    if (isOldStructure) {
      // Drop old incompatible structure
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed as StudioProject;
  } catch {
    return null;
  }
}

export function useStudioProjects() {
  const initialConversations = modes.reduce<Record<string, ModeSession>>(
    (acc, mode) => {
      acc[mode.id] = {
        sessionId: crypto.randomUUID(),
        blocks: [],
        summary: undefined,
      };
      return acc;
    },
    {}
  );

  const [project, setProject] = useState<StudioProject>(() => {
    const saved = loadProjectFromStorage();

    if (saved) return saved;

    return {
      id: "default",
      name: "Untitled Project",
      conversations: initialConversations,
      lastUpdated: Date.now(),
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    } catch {
      // silently fail (e.g. storage full)
    }
  }, [project]);

  const addBlock = (modeId: string, block: StudioBlock) => {
    setProject((prev) => {
      const session = prev.conversations[modeId];
      if (!session) return prev;

      const newBlocks = [...session.blocks, block];

      // 🧠 Compression Trigger (Scaffold Only)
      if (newBlocks.length > 20) {  
       // TODO: compressSession(modeId) when real LLM integrated
     }

      return {
        ...prev,
        conversations: {
          ...prev.conversations,
          [modeId]: {
            ...session,
            blocks: newBlocks,
          },
        },
        lastUpdated: Date.now(),
      };
    });
  };

  const resetModeConversation = (modeId: string) => {
    setProject((prev) => ({
      ...prev,
      conversations: {
        ...prev.conversations,
        [modeId]: {
          sessionId: crypto.randomUUID(),
          blocks: [],
          summary: undefined,
        },
      },
      lastUpdated: Date.now(),
    }));
  };

  const updateLastBlock = (
    modeId: string,
    updater: (block: StudioBlock) => StudioBlock
  ) => {
    setProject((prev) => {
      const modeSession = prev.conversations[modeId];
      if (!modeSession) return prev;

      const modeBlocks = modeSession.blocks;
      if (!modeBlocks.length) return prev;

      const updatedBlocks = [...modeBlocks];
      const lastIndex = updatedBlocks.length - 1;

      updatedBlocks[lastIndex] = updater(updatedBlocks[lastIndex]);

      return {
        ...prev,
        conversations: {
          ...prev.conversations,
          [modeId]: {
            ...modeSession,
            blocks: updatedBlocks,
          },
        },
        lastUpdated: Date.now(),
      };
    });
  };

  return { project, addBlock, resetModeConversation, updateLastBlock };
}
