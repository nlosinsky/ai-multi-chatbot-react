import styles from './Controls.module.css';
import { useState } from "react";

function Controls({onSend}) {
  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  }

  const handleSubmit = () => {
    if (content.trim() === '') {
      return;
    }

    onSend(content);
    setContent('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      handleSubmit();
    }
  }

  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea className={styles.TextArea}
                  placeholder="Write a message here..."
                  value={content}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
        ></textarea>
      </div>
      <button type="button"
              className={styles.Button}
              onClick={handleSubmit}
      >
        <SendIcon />
      </button>
    </div>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
      <path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z"/>
    </svg>
  )
}

export default Controls;
