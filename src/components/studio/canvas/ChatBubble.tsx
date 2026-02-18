// src/components/studio/canvas/ChatBubble.tsx

import React, { memo, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { StudioBlock } from "../../../components/studio/types/studio";

interface ChatBubbleProps {
  block: StudioBlock;
  isGrouped: boolean;
  isMine: boolean;
}

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ChatBubbleComponent({
  block,
  isGrouped,
  isMine,
}: ChatBubbleProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  // Detect overflow once content renders
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    setIsOverflowing(el.scrollHeight > 120);
  }, [block.content]);

  const headerLabel = isMine ? "You" : "IdeaCodex";

  return (
    <div className={`msg-row ${isMine ? "right" : "left"}`}>
      <div
        className={`msg ${block.role} ${isGrouped ? "grouped" : ""}`}
      >
        {!isGrouped && (
          <div className="msg-header">
            <span className="tool-name">{headerLabel}</span>
          </div>
        )}

        <div
          ref={contentRef}
          className={`msg-content ${expanded ? "expanded" : ""}`}
        >
          <ReactMarkdown>
            {block.content || ""}
          </ReactMarkdown>
        </div>

        {isOverflowing && !expanded && (
          <button
            className="read-more"
            onClick={() => setExpanded(true)}
          >
            …Read more
          </button>
        )}

        <div className={`msg-meta ${expanded ? "expanded" : ""}`}>
          {formatTimestamp(block.createdAt)}
        </div>
      </div>
    </div>
  );
}

/**
 * Memoized for performance.
 * Prevents re-rendering unchanged messages.
 */
export default memo(ChatBubbleComponent);
