import React, { useState, useRef, useEffect } from "react";
import { useAppAccess } from "../../../contexts/AppAccessContext";
import "../../../styles/AIBar.css";

export default function AIBar({ onSend }) {
  const { tier, policy } = useAppAccess();

  const quota =
    typeof policy?.apiCredits === "number"
      ? policy.apiCredits
      : policy?.apiCredits === "unlimited"
      ? Infinity
      : 0;

  const [used, setUsed] = useState(0);
  const [value, setValue] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [isMultiline, setIsMultiline] = useState(false);

  const textareaRef = useRef(null);
  const composerRef = useRef(null);
  const barRef = useRef(null);

  const lastHeightRef = useRef(0);

  const remaining = quota === Infinity ? "∞" : quota - used;
  const canSend = quota === Infinity || used < quota;

  /* Auto-grow textarea */
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

  /* Measure FINAL ai-bar height (loop-safe) */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const observer = new ResizeObserver(() => {
      const height = Math.ceil(bar.getBoundingClientRect().height);

      // 🔒 prevent feedback loop
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

  const send = () => {
    if (!value.trim() || !canSend || streaming) return;

    const prompt = value.trim();
    setValue("");
    setUsed((u) => u + 1);

    onSend?.(prompt);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

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
              : "AI quota reached — upgrade to continue"
          }
          disabled={!canSend}
          rows={1}
        />

        <div className="ai-actions">
          <button
            className="btn-send"
            onClick={send}
            disabled={!canSend || streaming}
            title="Send"
          >
            ➤
          </button>
        </div>
      </div>

      <div className="ai-bar-meta">
        <span>Tier: {tier.toUpperCase()}</span>
        <span>Credits left: {remaining}</span>
      </div>
    </div>
  );
}
