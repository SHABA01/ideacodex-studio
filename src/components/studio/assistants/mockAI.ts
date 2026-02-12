export function mockAIResponse(userText) {
  return {
    id: Date.now().toString() + "-ai",
    role: "ai",
    content:
      `🧠 IdeaCodex (mock response)\n\n` +
      `I’ve received your idea:\n“${userText}”\n\n` +
      `You can now refine it using tools on the right.`,
    source: "IdeaCodex",
    createdAt: Date.now()
  };
}
