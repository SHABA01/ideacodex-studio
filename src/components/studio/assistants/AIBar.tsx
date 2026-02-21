import React, { useState, useRef, useEffect } from "react";
import "../../../styles/AIBar.css";

type AIBarProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export default function AIBar({
  onSend,
  disabled = false,
}: AIBarProps) {
  /* -----------------------------
     Local Quota (No Tier System)
  ------------------------------ */

  const TOTAL_CREDITS = 100; // ← Change later if needed

  const [used, setUsed] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [streaming, setStreaming] = useState<boolean>(false);
  const [isMultiline, setIsMultiline] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const composerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const lastHeightRef = useRef<number>(0);

  const canSend = used < TOTAL_CREDITS;

  /* -----------------------------
     Auto-grow textarea
  ------------------------------ */
  useEffect(() => {
    const textarea = textareaRef.current;
    const composer = composerRef.current;
    if (!textarea || !composer) return;

    const MAX_HEIGHT = 160;
    const BASE_HEIGHT = 48;

    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, MAX_HEIGHT);
    textarea.style.height = `${newHeight}px`;

    textarea.style.overflowY =
      textarea.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";

    const multiline = newHeight > 52;
    setIsMultiline(multiline);

    composer.style.minHeight = multiline
      ? `${newHeight + 24}px`
      : `${BASE_HEIGHT}px`;
  }, [value]);

  /* -----------------------------
     ResizeObserver (loop-safe)
  ------------------------------ */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const observer = new ResizeObserver(() => {
      const height = Math.ceil(bar.getBoundingClientRect().height);

      if (height === lastHeightRef.current) return;

      lastHeightRef.current = height;

      document.documentElement.style.setProperty(
        "--ai-bar-height",
        `${height}px`
      );
    });

    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  /* -----------------------------
     Send Logic
  ------------------------------ */
  const send = () => {
    if (!value.trim() || !canSend || streaming) return;

    const prompt = value.trim();
    setValue("");
    setUsed((u) => u + 1);

    onSend?.(prompt);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  /* -----------------------------
     Render
  ------------------------------ */
  return (
    <div ref={barRef} className="ai-bar">
      <div
        ref={composerRef}
        className={`ai-composer ${isMultiline ? "multiline" : ""}`}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            canSend
              ? "Message IdeaCodex…"
              : "Credit limit reached"
          }
          disabled={disabled}
          rows={1}
        />

        <div className="ai-actions">
          <button
            className="btn-send"
            onClick={send}
            disabled={disabled}
            title="Send"
          >
            ➤
          </button>
        </div>
      </div>

      <div className="ai-bar-meta">
        <span>
          Credits: {used} / {TOTAL_CREDITS}
        </span>
      </div>
    </div>
  );
}
