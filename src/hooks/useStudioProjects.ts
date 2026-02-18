// src/hooks/useStudioProjects.ts

import { useState } from "react";
import type { StudioProject, StudioBlock } from "../components/studio/types/studio";

export function useStudioProjects() {
  const [project, setProject] = useState<StudioProject>({
    id: "default",
    name: "Untitled Project",
    blocks: [],
    lastUpdated: Date.now(),
  });

  const addBlock = (block: StudioBlock) => {
    setProject((prev) => ({
      ...prev,
      blocks: [...prev.blocks, block],
      lastUpdated: Date.now(),
    }));
  };

  const resetProject = () => {
    setProject({
      id: "default",
      name: "Untitled Project",
      blocks: [],
      lastUpdated: Date.now(),
    });
  };

  return {
    project,
    addBlock,
    resetProject,
  };
}
