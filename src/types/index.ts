export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Assistant {
  sendMessageStream(content: string): AsyncGenerator<string, void, unknown>;
}
