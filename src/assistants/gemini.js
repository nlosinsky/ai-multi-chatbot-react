import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY });

export class GeminiAssistant {
  #chat;

  constructor(model = "gemini-1.5-flash") {
    this.#chat = ai.chats.create({
      model,
      history: []
    });
  }

  // todo remove
  async sendMessage(message) {
    const result = await this.#chat.sendMessage({ message });
    return result.text;
  }

  async* sendMessageStream(message) {
    const stream = await this.#chat.sendMessageStream({ message });

    for await (const chunk of stream) {
      yield chunk.text
    }
  }
}
