import { useState, useEffect } from "react";
import type { StudioProject, StudioBlock } from "../components/studio/types/studio";
import { modes } from "../modes/modeConfig";

const STORAGE_KEY = "ideacodex-project";

function loadProjectFromStorage(): StudioProject | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    return JSON.parse(raw) as StudioProject;
  } catch {
    return null;
  }
}

export function useStudioProjects() {
  const initialConversations = modes.reduce<Record<string, StudioBlock[]>>(
    (acc, mode) => {
      acc[mode.id] = [];
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
    setProject((prev) => ({
      ...prev,
      conversations: {
        ...prev.conversations,
        [modeId]: [...prev.conversations[modeId], block],
      },
      lastUpdated: Date.now(),
    }));
  };

  return { project, addBlock };
}
