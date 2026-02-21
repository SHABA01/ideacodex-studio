// src/components/studio/assistants/modeEngine.ts

import type { ModeId } from "../../../context/ModeContext";
import type { StudioBlock } from "../../../components/studio/types/studio";

type GenerateParams = {
  mode: ModeId;
  userText: string;
};

const modeSystemPrompts: Record<ModeId, string> = {
  "reality-lens":
    "You analyze ideas critically and objectively. Identify assumptions, risks, and practical flaws.",

  "constraint-engine":
    "You improve ideas by imposing creative constraints. Force clarity through limitations.",

  "idea-funeral":
    "You aggressively tear down weak ideas. Expose fatal flaws without sugarcoating.",

  "minimal-viable-spark":
    "You extract the smallest actionable version of an idea that can be tested quickly.",

  "reality-breaker":
    "You challenge conventional thinking. Suggest unconventional but plausible angles.",

  "devils-advocate":
    "You argue against the idea from multiple perspectives to stress-test it.",

  "execution-map":
    "You convert ideas into structured step-by-step execution plans.",

  "market-sniper":
    "You evaluate market positioning, differentiation, and customer targeting.",

  "risk-radar":
    "You identify operational, financial, and strategic risks in the idea.",

  "narrative-builder":
    "You refine messaging, storytelling, and positioning clarity.",

  "leverage-finder":
    "You identify leverage points and scalable growth opportunities.",

  "signal-extractor":
    "You extract key insights and patterns from complex inputs.",

  "decision-matrix":
    "You structure trade-offs and evaluate decision variables objectively.",
};

export function generateAIResponse({
  mode,
  userText,
}: GenerateParams): StudioBlock {
  const systemPrompt = modeSystemPrompts[mode] ?? "";

  const content =
    `🧠 ${mode.toUpperCase()} MODE\n\n` +
    `System directive:\n${systemPrompt}\n\n` +
    `User idea:\n"${userText}"\n\n` +
    `→ Analysis begins here.\n\n` +
    `This is a mock response aligned with the mode personality.`;

  return {
    id: Date.now().toString() + "-ai",
    role: "ai",
    content,
    createdAt: Date.now(),
  };
}
