import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

export class Assistant {
  #model;

  constructor(model = "grok-3-latest") {
    this.#model = model;
  }

  async* sendMessageStream(content) {
    const stream = await client.chat.completions.create({
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
