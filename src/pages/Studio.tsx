// src/pages/Studio.tsx
import { useStudioProjects } from "../hooks/useStudioProjects";
import StudioCanvas from "../components/studio/canvas/StudioCanvas";
import AIBar from "../components/studio/assistants/AIBar";
import ThemeToggle from "../components/ThemeToggle";
import { mockAIResponse } from "../components/studio/assistants/mockAI";
import type { StudioBlock } from "../components/studio/types/studio";
import "../styles/Studio.css";

export default function Studio() {
  const { project, addBlock } = useStudioProjects();

  const currentMode = "Reality Lens";

  return (
    <div className="studio-root">

      <header className="studio-header">
        <div className="studio-header-left">
          <h2 className="studio-mode-name">{currentMode}</h2>
        </div>

        <div className="studio-header-right">
          <ThemeToggle />
        </div>
      </header>

      <div className="studio-canvas-wrapper">
        <StudioCanvas blocks={project.blocks} />
      </div>

      <AIBar
        onSend={(text: string) => {
          const userBlock: StudioBlock = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            createdAt: Date.now(),
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
