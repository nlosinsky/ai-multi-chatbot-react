import { Anthropic } from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});


export class AnthropicAssistant {
  #model;

  constructor(model = "claude-3-5-haiku-20241022") {
    this.#model = model;
  }

  async* sendMessageStream(content) {
    const stream = await client.messages.create({
      messages: [{ content, role: 'user' }],
      max_tokens: 1024,
      model: this.#model,
      stream: true
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta') {
        yield chunk.delta.text;
      }
    }
  }
}
