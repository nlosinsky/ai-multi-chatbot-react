export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface Assistant {
  sendMessageStream(content: string, messages?: Message[]): AsyncGenerator<string, void, unknown>;
}
