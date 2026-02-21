// src/pages/Studio.tsx
import { useMode } from "../context/ModeContext";
import { modes } from "../modes/modeConfig";
import { useStudioProjects } from "../hooks/useStudioProjects";
import StudioCanvas from "../components/studio/canvas/StudioCanvas";
import AIBar from "../components/studio/assistants/AIBar";
import ThemeToggle from "../components/ThemeToggle";
import { generateAIResponse } from "../components/studio/assistants/modeEngine";
import type { StudioBlock } from "../components/studio/types/studio";
import "../styles/Studio.css";

type StudioProps = {
  onOpenMobile: () => void;
  mobileOpen: boolean;
};

export default function Studio({
  onOpenMobile,
  mobileOpen,
}: StudioProps) {
  const { project, addBlock } = useStudioProjects();

  const { currentMode } = useMode();
  const modeLabel = modes.find(m => m.id === currentMode)?.label ?? "";

  return (
    <div className="studio-root">

      <header className="studio-header">
        <div className="studio-header-left">
          <button
            className={`mobile-open ${mobileOpen ? "open" : ""}`}
            onClick={onOpenMobile}
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars" />
          </button>

          <h2 className="studio-mode-name">{modeLabel}</h2>
        </div>

        <div className="studio-header-right">
          <ThemeToggle />
        </div>
      </header>

      <div className="studio-canvas-wrapper">
        <StudioCanvas blocks={project.conversations[currentMode] || []} />
      </div>

      <AIBar
        onSend={(text: string) => {
          const userBlock: StudioBlock = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            createdAt: Date.now(),
          };

          addBlock(currentMode, userBlock);

          setTimeout(() => {
            addBlock(
             currentMode,
             generateAIResponse({
               mode: currentMode,
               userText: text,
             })
            );
          }, 600);
        }}
      />

    </div>
  );
}
