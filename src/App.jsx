import styles from './App.module.css';
import Chat from "./components/Chat/Chat.jsx";
import { useState } from "react";
import Controls from "./components/Controls/Controls.jsx";

function App() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);

  return (
    <main className={styles.App}>
      <header className={styles.Header}>
        <img className={styles.Logo} src="chat-bot.png"/>
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <section className={styles.ChatContainer}>
        <Chat messages={messages}/>
      </section>
      <Controls/>
    </main>
  )
}

const DEFAULT_MESSAGES = [
  {
    role: 'user',
    content: 'Hello, how are you?'
  },
  {
    role: 'assistant',
    content: 'I am fine, thank you! How can I help you today?'
  },
  {
    role: 'user',
    content: 'What is the weather like today?'
  },
  {
    role: 'assistant',
    content: 'The weather is sunny with a high of 25°C.'
  }
];

export default App
