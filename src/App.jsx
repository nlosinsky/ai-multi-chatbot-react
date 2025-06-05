import styles from './App.module.css';
import Chat from "./components/Chat/Chat.jsx";
import { useState } from "react";
import Controls from "./components/Controls/Controls.jsx";
import { GeminiAssistant } from "./assistants/gemini.js";
import { OpenAIAssistant } from "./assistants/openai.js";
import Loader from "./components/Loader/Loader.jsx";
const geminiChat = new OpenAIAssistant();

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }

  const onSend = async (content) => {
    setIsLoading(true);
    addMessage({ role: 'user', content });

    try {
      const result = await geminiChat.sendMessage(content);
      addMessage({ role: 'assistant', content: result });
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({ role: 'assistant', content: 'An error occurred while processing your request.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.App}>
      {isLoading && <Loader />}
      <header className={styles.Header}>
        <img className={styles.Logo} src="chat-bot.png"/>
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <section className={styles.ChatContainer}>
        <Chat messages={messages}/>
      </section>
      <Controls onSend={onSend} isDisabled={isLoading}/>
    </main>
  )
}

export default App
