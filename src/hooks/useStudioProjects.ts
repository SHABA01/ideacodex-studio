import { useState } from "react";
import type { StudioProject, StudioBlock } from "../components/studio/types/studio";
import { modes } from "../modes/modeConfig";

export function useStudioProjects() {
  const initialConversations = modes.reduce<Record<string, StudioBlock[]>>(
    (acc, mode) => {
      acc[mode.id] = [];
      return acc;
    },
    {}
  );

  const [project, setProject] = useState<StudioProject>({
    id: "default",
    name: "Untitled Project",
    conversations: initialConversations,
    lastUpdated: Date.now(),
  });

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
