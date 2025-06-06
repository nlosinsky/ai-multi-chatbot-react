import { Anthropic } from '@anthropic-ai/sdk';
import type { Assistant } from '../types';

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

type ChunkType = {
  type: string;
  delta: {
    text: string
  }
}


export class AnthropicAIAssistant implements Assistant {
  #model;

  constructor(model = "claude-3-5-haiku-20241022") {
    this.#model = model;
  }

  async* sendMessageStream(content: string) {
    const stream = await client.messages.create({
      messages: [{content, role: 'user'}],
      max_tokens: 1024,
      model: this.#model,
      stream: true
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta) {
        const chunkData = chunk as ChunkType;
        yield chunkData.delta.text;
      }
    }
  }
}
