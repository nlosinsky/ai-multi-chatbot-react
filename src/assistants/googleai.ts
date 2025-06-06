import { GoogleGenAI } from "@google/genai";
import type { Assistant } from '../types';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY });

export class GoogleAIAssistant implements Assistant {
  #chat;

  constructor(model = "gemini-1.5-flash") {
    this.#chat = ai.chats.create({
      model,
      history: []
    });
  }

  async *sendMessageStream(message: string) {
    const stream = await this.#chat.sendMessageStream({ message });

    for await (const chunk of stream) {
      if (chunk.text) {
        yield chunk.text
      }
    }
  }
}
