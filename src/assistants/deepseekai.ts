import OpenAI from "openai";
import { OpenAIAssistant } from "./openai";

const client = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
  dangerouslyAllowBrowser: true
});

export class DeepseekAIAssistant extends OpenAIAssistant {
  constructor(model = "deepseek-chat") {
    super(model, client);
  }
}
