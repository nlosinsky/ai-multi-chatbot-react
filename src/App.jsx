import styles from './App.module.css';
import Chat from "./components/Chat/Chat.jsx";
import { useState } from "react";
import Controls from "./components/Controls/Controls.jsx";
import Loader from "./components/Loader/Loader.jsx";
import { OpenAIAssistant } from "./assistants/openai.js";

const chat = new OpenAIAssistant();

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const addMessage = (message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }

  const updateLastMessage = (content) => {
    setMessages(prevMessages => {
      return prevMessages.map((message, index) => {
        if (index === prevMessages.length - 1 && message.role === 'assistant') {
          return { ...message, content: `${message.content}${content}` };
        }
        return message;
      })
    });
  }

  const onSend = async (content) => {
    setIsLoading(true);
    addMessage({ role: 'user', content });

    try {
      const stream = await chat.sendMessageStream(content);
      let isFirstChunk = false;
      for await (const chunk of stream) {
        if (!isFirstChunk) {
          isFirstChunk = true;
          addMessage({ role: 'assistant', content: '' });
          setIsStreaming(true);
          setIsLoading(false);
        }
        updateLastMessage(chunk);
      }
      setIsStreaming(false);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({ role: 'assistant', content: 'An error occurred while processing your request.' });
      setIsLoading(false);
      setIsStreaming(false);
    }
  }

  return (
    <main className={styles.App}>
      {isLoading && <Loader/>}
      <header className={styles.Header}>
        <img className={styles.Logo} src="chat-bot.png"/>
        <h2 className={styles.Title}>AI Chatbot</h2>
      </header>
      <section className={styles.ChatContainer}>
        <Chat messages={messages}/>
      </section>
      <Controls onSend={onSend} isDisabled={isLoading || isStreaming}/>
    </main>
  )
}

export default App
