import styles from './Chat.module.css';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: 'Welcome to the AI Chatbot! How can I assist you today?'
}

function Chat({messages}) {
  const messagesWithWelcome = messages.length === 0 ? [WELCOME_MESSAGE] : messages;

  return (
    <div className={styles.Chat}>
      {
        messagesWithWelcome.map((message, index) => (
          <div key={index}
               data-role={message.role}
               className={styles.Message}
          >
            {message.content}
          </div>
        ))
      }
    </div>
  );
}

export default Chat;
