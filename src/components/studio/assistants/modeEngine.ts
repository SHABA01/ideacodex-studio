// src/components/studio/assistants/modeEngine.ts

import type { ModeId } from "../../../context/ModeContext";
import type { StudioBlock } from "../../../components/studio/types/studio";
import type { LLMMessage } from "../types/studio";

type GenerateParams = {
  mode: string;
  userText: string;
  previousBlocks: StudioBlock[];
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

function buildLLMHistory(
  mode: string,
  blocks: StudioBlock[],
  systemPrompt: string
): LLMMessage[] {

  const history: LLMMessage[] = [];

  // System directive first
  history.push({
    role: "system",
    content: systemPrompt,
  });

  for (const block of blocks) {
    if (block.role === "user") {
      history.push({
        role: "user",
        content: block.content,
      });
    }

    if (block.role === "ai") {
      history.push({
        role: "assistant",
        content: block.content,
      });
    }
  }

  return history;
}

export function generateAIResponse({
  mode,
  userText,
  previousBlocks,
}: GenerateParams): StudioBlock {

  const systemPrompt = modeSystemPrompts[mode] ?? "";

  const llmMessages = buildLLMHistory(
    mode,
    previousBlocks,
    systemPrompt
  );

  // Simulated AI output
  const content =
    `🧠 ${mode.toUpperCase()} MODE\n\n` +
    `Structured LLM Messages:\n\n` +
    JSON.stringify(llmMessages, null, 2);

  return {
    id: Date.now().toString() + "-ai",
    role: "ai",
    content,
    createdAt: Date.now(),
  };
}

export async function streamAIResponse({
  mode,
  userText,
  previousBlocks,
  onChunk,
  signal,
}: {
  mode: string;
  userText: string;
  previousBlocks: StudioBlock[];
  onChunk: (chunk: string) => void;
  signal: AbortSignal;
}) {
  const systemPrompt = modeSystemPrompts[mode] ?? "";

  const llmMessages = buildLLMHistory(
    mode,
    previousBlocks,
    systemPrompt
  );

  const simulatedResponse =
    `🧠 ${mode.toUpperCase()} MODE\n\n` +
    `Analyzing structured history...\n\n` +
    JSON.stringify(llmMessages, null, 2);

  const words = simulatedResponse.split(" ");

  let accumulated = "";

  for (let i = 0; i < words.length; i++) {
    // 🚨 Cancellation check
    if (signal.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    accumulated += words[i] + " ";

    onChunk(accumulated);

    await new Promise((r) => setTimeout(r, 20));
  }
}