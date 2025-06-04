import styles from './Chat.module.css';

function Chat({messages}) {
  return (
    <div className={styles.Chat}>
      {
        messages.map((message, index) => (
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
