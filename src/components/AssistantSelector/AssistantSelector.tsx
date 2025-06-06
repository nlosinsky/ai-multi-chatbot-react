import { useEffect, useState } from "react";
import {
  AnthropicAIAssistant,
  DeepseekAIAssistant,
  GoogleAIAssistant,
  OpenAIAssistant,
  XAIAssistant
} from '../../assistants';
import type { Assistant } from '../../types';
import styles from './AssistantSelector.module.css';

type AssistantType = "googleai" | "openai" | "deepseekai" | "anthropicai" | "xai";

type AssistantMapType = {
  // [key in AssistantType]: typeof Assistant;
  [key in AssistantType]: new (model?: string) => Assistant;
};

const assistantMap: AssistantMapType = {
  googleai: GoogleAIAssistant,
  openai: OpenAIAssistant,
  deepseekai: DeepseekAIAssistant,
  anthropicai: AnthropicAIAssistant,
  xai: XAIAssistant,
};

type AssistantSelectorProps = {
  onAssistantChange: (assistant: Assistant) => void;
}

function AssistantSelector({onAssistantChange}: AssistantSelectorProps) {
  const [value, setValue] = useState("openai:gpt-4o-mini");

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    const [assistant, model] = value.split(":") as [AssistantType, string];
    const AssistantClass = assistantMap[assistant];

    if (!AssistantClass) {
      throw new Error(`Unknown assistant: ${assistant} or model: ${model}`);
    }

    onAssistantChange(new AssistantClass(model));
  }, [value, onAssistantChange]);


  return (
    <div className={styles.Assistant}>
      <span>Assistant:</span>
      <select defaultValue={value} onChange={handleValueChange}>
        <optgroup label="Google AI">
          <option value="googleai:gemini-2.0-flash">Gemini 2.0 Flash</option>
          <option value="googleai:gemini-2.0-flash-lite">
            Gemini 2.0 Flash-Lite
          </option>
        </optgroup>

        <optgroup label="Open AI">
          <option value="openai:gpt-4o-mini">GPT-4o mini</option>
          <option value="openai:chatgpt-4o-latest">ChatGPT-4o</option>
        </optgroup>

        <optgroup label="DeepSeek AI">
          <option value="deepseekai:deepseek-chat">DeepSeek-V3</option>
        </optgroup>

        <optgroup label="Anthropic AI">
          <option value="anthropicai:claude-3-5-haiku-latest">
            Claude 3.5 Haiku
          </option>
        </optgroup>

        <optgroup label="X AI">
          <option value="xai:grok-3-mini-latest">Grok 3 Mini</option>
        </optgroup>
      </select>
    </div>
  );
}

export default AssistantSelector;
