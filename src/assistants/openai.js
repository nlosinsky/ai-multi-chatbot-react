import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class OpenAIAssistant {
  #client;
  #model;

  constructor(model = "gpt-4o-mini", client = openai) {
    this.#client = client;
    this.#model = model;
  }

  async* sendMessageStream(content) {
    const stream = await this.#client.chat.completions.create({
      messages: [{ content, role: 'user' }],
      model: this.#model,
      stream: true
    });

    for await (const chunk of stream) {
      if (chunk.choices[0].delta.content) {
        yield chunk.choices[0].delta.content;
      }
    }
  }
}
