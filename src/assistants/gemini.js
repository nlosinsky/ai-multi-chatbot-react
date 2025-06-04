import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY });

export class GeminiAssistant {
  #chat;

  constructor() {
    this.#chat = ai.chats.create({
      model: "gemini-1.5-flash",
      history: []
    });
  }

  async sendMessage(message) {
    const result = await this.#chat.sendMessage({ message });
    return result.text;
  }

}
