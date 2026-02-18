// src/components/studio/assistants/mockAI.ts

import type { StudioBlock } from "../../studio/types/studio";

export function mockAIResponse(userText: string): StudioBlock {
  return {
    id: Date.now().toString() + "-ai",
    role: "ai",
    content:
      `🧠 IdeaCodex\n\n` +
      `I’ve received your idea:\n“${userText}”\n\n` +
      `You can now refine it further.`,
    createdAt: Date.now(),
  };
}
