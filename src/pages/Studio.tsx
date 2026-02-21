// src/pages/Studio.tsx
import { useRef, useState } from "react";
import { useMode } from "../context/ModeContext";
import { modes } from "../modes/modeConfig";
import { useStudioProjects } from "../hooks/useStudioProjects";
import StudioCanvas from "../components/studio/canvas/StudioCanvas";
import AIBar from "../components/studio/assistants/AIBar";
import ThemeToggle from "../components/ThemeToggle";
import { streamAIResponse } from "../components/studio/assistants/modeEngine";
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
  const {
    project,
    addBlock,
    resetModeConversation,
    updateLastBlock,
  } = useStudioProjects();

  const { currentMode } = useMode();

  const modeLabel = modes.find(m => m.id === currentMode)?.label ?? "";

  const [isGenerating, setIsGenerating] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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
          {isGenerating && (
            <button
              className="mode-stop-btn"
              onClick={() => {
                abortRef.current?.abort();
              }}
              title="Stop generation"
            >
              <i className="fa-solid fa-stop" />
            </button>
          )}

          <button
            className="mode-reset-btn"
            onClick={() => {
              if (
                confirm("Reset this mode conversation? This cannot be undone.")
              ) {
                resetModeConversation(currentMode);
              }
            }}
            title="Reset current mode"
          >
            <i className="fa-solid fa-rotate-right" />
          </button>

          <ThemeToggle />
        </div>
      </header>

      <div className="studio-canvas-wrapper">
        <StudioCanvas
          blocks={project.conversations[currentMode] || []}
          isTyping={isGenerating}
        />
      </div>

      <AIBar
        disabled={isGenerating}
        onSend={async (text: string) => {
          if (isGenerating) return;

          const userId = Date.now().toString();

          const userBlock: StudioBlock = {
            id: userId,
            role: "user",
            content: text,
            createdAt: Date.now(),
         };

          addBlock(currentMode, userBlock);

          const aiId = Date.now().toString() + "-ai";

          addBlock(currentMode, {
            id: aiId,
            role: "ai",
            content: "",
            createdAt: Date.now(),
          });

          setIsGenerating(true);

          const controller = new AbortController();
          abortRef.current = controller;

          try {
            await streamAIResponse({
              mode: currentMode,
              userText: text,
              previousBlocks: project.conversations[currentMode] || [],
              signal: controller.signal,
              onChunk: (chunk) => {
                updateLastBlock(currentMode, (block) => ({
                  ...block,
                  content: chunk,
                }));
              },
            });
          } catch (err) {
            if ((err as any).name !== "AbortError") {
              console.error(err);
            }
          } finally {
            setIsGenerating(false);
            abortRef.current = null;
          }
        }}
      />
    </div>
  );
}
