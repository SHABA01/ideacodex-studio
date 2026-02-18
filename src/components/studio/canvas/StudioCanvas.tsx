import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import "../../../styles/StudioCanvas.css";

const NEAR_BOTTOM_PX = 80;

export interface StudioBlock {
  id: string;
  role: "user" | "ai" | "tool";
  content: string;
  senderId?: string;
  displayName?: string;
  fullName?: string;
  source?: string;
  timestamp?: string;
  createdAt?: number;
  suggestedActions?: string[];
  canConvert?: boolean;
}

interface StudioCanvasProps {
  blocks?: StudioBlock[];
  isTyping?: boolean;
}

export default function StudioCanvas({
  blocks = [],
  isTyping = false,
}: StudioCanvasProps) {
  const isEmpty = blocks.length === 0;

  const timelineRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const allowAutoScrollRef = useRef(true);

  const updateScrollPosition = () => {
    const el = timelineRef.current;
    if (!el) return;

    const distance =
      el.scrollHeight - el.scrollTop - el.clientHeight;

    const nearBottom = distance <= NEAR_BOTTOM_PX;

    setIsAtBottom(nearBottom);
    allowAutoScrollRef.current = nearBottom;

    if (nearBottom && unreadCount !== 0) {
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollPosition);
    requestAnimationFrame(updateScrollPosition);

    return () =>
      el.removeEventListener("scroll", updateScrollPosition);
  }, []);

  useEffect(() => {
    requestAnimationFrame(updateScrollPosition);
  }, [blocks.length, isTyping]);

  useEffect(() => {
    if (!allowAutoScrollRef.current) {
      setUnreadCount((c) => c + 1);
      return;
    }

    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      updateScrollPosition();
    });
  }, [blocks.length, isTyping]);

  if (isEmpty) {
    return (
      <div className="studio-canvas">
        <div className="canvas-empty">
          <div className="canvas-empty-inner">
            <p className="primary">Your canvas is empty</p>
            <p className="secondary">
              Start by launching a tool or sending a message
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="studio-canvas">
      <div className="chat-timeline" ref={timelineRef}>
        {blocks.map((block, index) => {
          const prev = blocks[index - 1];
          const isGrouped =
            prev &&
            prev.senderId === block.senderId &&
            prev.role === block.role;

          return (
            <ChatBubble
              key={block.id}
              block={block}
              isGrouped={!!isGrouped}
              isMine={block.role === "user"}
              highlightable={block.role !== "user"}
            />
          );
        })}

        {isTyping && (
          <div className="msg-row left">
            <div className="msg ai typing">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {!isAtBottom && (
        <button
          className="scroll-to-bottom centered"
          onClick={() => {
            allowAutoScrollRef.current = true;
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            setUnreadCount(0);
            updateScrollPosition();
          }}
          title="Jump to latest"
        >
          ↓
          {unreadCount > 0 && (
            <span className="unread-badge">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
