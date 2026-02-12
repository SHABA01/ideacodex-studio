import { useState, useMemo } from "react";

/**
 * useStudioTool
 *
 * Centralized controller for:
 * - tool launcher
 * - active tool lifecycle
 * - draft state
 * - insertion into canvas
 */
export function useStudioTool({ toolRegistry, onInsertBlock }) {
  const [isLauncherOpen, setLauncherOpen] = useState(false);
  const [activeToolId, setActiveToolId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [status, setStatus] = useState("draft"); // draft | ready | locked

  const activeTool = useMemo(
    () => toolRegistry.find((t) => t.id === activeToolId) || null,
    [activeToolId, toolRegistry]
  );


  /* =========================
     Launcher controls
     ========================= */

  const openLauncher = () => setLauncherOpen(true);
  const closeLauncher = () => setLauncherOpen(false);

  /* =========================
     Tool lifecycle
     ========================= */

  const openTool = (toolId) => {
    setActiveToolId(toolId);
    setDraft(null);
    setStatus("draft");
    setLauncherOpen(false);
  };

  const closeTool = () => {
    setActiveToolId(null);
    setDraft(null);
    setStatus("draft");
  };

  /* =========================
     Draft + insert
     ========================= */

  const updateDraft = (nextDraft) => {
    setDraft(nextDraft);
    setStatus("ready");
  };

  const insert = () => {
    if (!activeTool || !draft) return;

    onInsertBlock({
      tool: activeTool.id,
      title: activeTool.name,
      content: draft
    });

    closeTool();
  };

  const setReady = (isReady) => {
    setStatus(isReady ? "ready" : "draft");
  };

  return {
    /* state */
    activeTool,
    activeToolId,
    isLauncherOpen,
    draft,
    status,

    /* launcher */
    openLauncher,
    closeLauncher,

    /* tool */
    openTool,
    closeTool,

    /* data */
    updateDraft,
    insert,
    setReady
  };
}
