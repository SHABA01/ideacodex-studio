// src/pages/Studio.tsx

import { useStudioProjects } from "../hooks/useStudioProjects";
import StudioCanvas from "../components/studio/canvas/StudioCanvas";
import AIBar from "../components/studio/assistants/AIBar";
import ThemeToggle from "../components/ThemeToggle";
import { mockAIResponse } from "../components/studio/assistants/mockAI";
import "../styles/Studio.css";

/**
 * Studio
 * Core workspace.
 * Sidebar controls modes.
 * Header displays current mode.
 */

export default function Studio() {
  const { project, addBlock } = useStudioProjects();

  // Temporary hardcoded mode
  // Later this will come from global mode state
  const currentMode = "Reality Lens";

  return (
    <div className="studio-root">

      {/* HEADER BAR */}
      <header className="studio-header">
        <div className="studio-header-left">
          <h2 className="studio-mode-name">{currentMode}</h2>
        </div>

        <div className="studio-header-right">
          <ThemeToggle />
        </div>
      </header>

      {/* CANVAS */}
      <div className="studio-canvas-wrapper">
        <StudioCanvas blocks={project.blocks} />
      </div>

      {/* AI BAR */}
      <AIBar
        onSend={(text: string) => {
          const userBlock = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            createdAt: Date.now()
          };

          addBlock(userBlock);

          setTimeout(() => {
            addBlock(mockAIResponse(text));
          }, 600);
        }}
      />

    </div>
  );
}
