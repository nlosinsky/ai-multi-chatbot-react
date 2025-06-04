import styles from './App.module.css';
import Chat from "./components/Chat/Chat.jsx";
import { useState } from "react";
import Controls from "./components/Controls/Controls.jsx";
import { GeminiAssistant } from "./assistants/gemini.js";
const geminiChat = new GeminiAssistant();

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }

  const onSend = async (content) => {
    addMessage({ role: 'user', content });

    try {
      const result = await geminiChat.sendMessage(content);
      addMessage({ role: 'assistant', content: result });
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({ role: 'assistant', content: 'An error occurred while processing your request.' });
    }
  }

  return (
    <main className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="chat-bot.png"/>
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <section className={styles.ChatContainer}>
        <Chat messages={messages}/>
      </section>
      <Controls onSend={onSend}/>
    </main>
  )
}

export default App
