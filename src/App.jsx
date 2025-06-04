import styles from './App.module.css';
import Chat from "./components/Chat/Chat.jsx";
import { useState } from "react";
import Controls from "./components/Controls/Controls.jsx";

function App() {
  const [messages, setMessages] = useState([]);

  const onSend = (content) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { role: 'user', content }
    ]);
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
