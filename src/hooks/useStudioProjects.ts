import { useState } from "react";

export function useStudioProjects() {
  const [project, setProject] = useState({
    id: "default",
    name: "Untitled Project",
    blocks: [],
    lastUpdated: Date.now()
  });

  const addBlock = (block) => {
    setProject((p) => ({
      ...p,
      blocks: [...p.blocks, block],
      lastUpdated: Date.now()
    }));
  };

  return { project, addBlock };
}
