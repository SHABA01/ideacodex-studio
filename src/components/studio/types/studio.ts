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
export interface StudioProject {
  id: string;
  name: string;
  description?: string;
  blocks: StudioBlock[];
  lastUpdated: number;
}
