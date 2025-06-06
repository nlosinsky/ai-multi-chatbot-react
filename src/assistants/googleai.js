import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY });

export class GoogleAIAssistant {
  #chat;

  constructor(model = "gemini-1.5-flash") {
    this.#chat = ai.chats.create({
      model,
      history: []
    });
  }

  async* sendMessageStream(message) {
    const stream = await this.#chat.sendMessageStream({ message });

    for await (const chunk of stream) {
      yield chunk.text
    }
  }
}
