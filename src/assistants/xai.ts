import OpenAI from "openai";
import { OpenAIAssistant } from "./openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
  dangerouslyAllowBrowser: true
});

export class XAIAssistant extends OpenAIAssistant {

  constructor(model = "grok-3-latest") {
    super(model, client);
  }
}
