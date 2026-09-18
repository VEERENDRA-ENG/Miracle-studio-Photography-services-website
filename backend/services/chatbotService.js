// ============================================================
// services/chatbotService.js — Chatbot logic
// ============================================================
// This service handles chatbot message processing:
//   1. Receive user question
//   2. Search FAQ database for matching answer
//   3. Return best matching answer
//   4. Return fallback if no match found
//
// Future: This will connect to an AI API (e.g., Gemini/OpenAI)
// when an AI_API_KEY is provided in the .env file.
//
// This will be fully implemented in Phase 12.
// ============================================================

// Placeholder — will be completed in Phase 12
const processMessage = async (userMessage) => {
  // TODO: Implement FAQ matching in Phase 12
  return {
    reply: 'Chatbot service not yet implemented. Coming in Phase 12.',
  };
};

module.exports = { processMessage };
