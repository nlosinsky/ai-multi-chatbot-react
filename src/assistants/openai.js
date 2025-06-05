import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class OpenAIAssistant {
  #model;

  constructor(model = "gpt-4o-mini") {
    this.#model = model;
  }

  // todo remove
  async sendMessage(content) {
    const response = await client.responses.create({
      model: this.#model,
      input: [{ content, role: 'user' }],
    });
    return response.output_text;
  }

  async* sendMessageStream(content) {
    const stream = await client.responses.create({
      model: this.#model,
      input: [{ content, role: 'user' }],
      stream: true
    });

    for await (const chunk of stream) {
      if (chunk.type === 'response.output_text.delta') {
        yield chunk.delta;
      }
    }
  }
}
