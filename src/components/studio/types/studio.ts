// src/types/studio.ts

/**
 * Role in the Studio conversation.
 * Only user ↔ ai allowed in current architecture.
 */
export type StudioRole = "user" | "ai";

/**
 * A single message block rendered in the Studio canvas.
 */
export interface StudioBlock {
  id: string;
  role: StudioRole;
  content: string;
  createdAt: number;
}

/**
 * A Studio project represents a conversation workspace.
 */
export type ModeSession = {
  sessionId: string;
  blocks: StudioBlock[];
  summary?: string;
};

export type StudioProject = {
  id: string;
  name: string;
  conversations: Record<string, ModeSession>;
  lastUpdated: number;
};

export type LLMRole = "system" | "user" | "assistant";

export type LLMMessage = {
  role: LLMRole;
  content: string;
};

