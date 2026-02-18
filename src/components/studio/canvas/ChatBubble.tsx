import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { StudioBlock } from "./StudioCanvas";

interface ChatBubbleProps {
  block: StudioBlock;
  isGrouped: boolean;
  isMine: boolean;
  highlightable?: boolean;
}

function getHeaderLabel(
  block: StudioBlock,
  isMine: boolean
): string {
  if (isMine) return "You";
  if (block.role === "ai") return "IdeaCodex";
  if (block.role === "tool") return block.source || "Tool";
  return block.displayName || block.fullName || "Collaborator";
}

function getTimestamp(block: StudioBlock): string {
  if (block.timestamp) return block.timestamp;

  if (block.createdAt) {
    return new Date(block.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return "";
}

export default function ChatBubble({
  block,
  isGrouped,
  isMine,
  highlightable = false,
}: ChatBubbleProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    setOverflowing(contentRef.current.scrollHeight > 120);
  }, [block.content]);

  return (
    <div className={`msg-row ${isMine ? "right" : "left"}`}>
      <div
        className={`msg ${block.role} ${isGrouped ? "grouped" : ""}`}
        data-sender={block.senderId}
      >
        {!isGrouped && (
          <div className="msg-header">
            <span className="tool-name">
              {getHeaderLabel(block, isMine)}
            </span>
          </div>
        )}

        {highlightable && (
          <div className="msg-insert">
            <button className="btn-insert" title="Insert into tool">
              →
            </button>
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

        {overflowing && !expanded && (
          <button
            className="read-more"
            onClick={() => setExpanded(true)}
          >
            …Read more
          </button>
        )}

        <div className={`msg-meta ${expanded ? "expanded" : ""}`}>
          {getTimestamp(block)}
        </div>

        {(block.suggestedActions?.length || block.canConvert) && (
          <div className="msg-cta">
            {block.suggestedActions?.map((action) => (
              <button key={action} className="msg-action-btn">
                {action}
              </button>
            ))}

            {block.canConvert && (
              <button className="msg-action-primary">
                Convert to Idea
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
