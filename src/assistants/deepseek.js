import OpenAI from "openai";

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true
});

export class DeepSeekAssistant {
  #model;

  constructor(model = "deepseek-chat") {
    this.#model = model;
  }

  // todo remove
  async sendMessage(content) {
    const completion = await client.chat.completions.create({
      messages: [{ content, role: 'user' }],
      model: this.#model,
    });
    return completion.choices[0].message.content;
  }

  async* sendMessageStream(content) {
    const stream = await client.chat.completions.create({
      messages: [{ content, role: 'user' }],
      model: this.#model,
      stream: true
    });

    for await (const chunk of stream) {
      yield chunk.choices[0].delta.content;
    }
  }
}
