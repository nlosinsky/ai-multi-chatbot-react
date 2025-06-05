import TextAreaAutoResize from 'react-textarea-autosize';

import styles from './Controls.module.css';
import { useEffect, useRef, useState } from "react";

function Controls({ onSend, isDisabled }) {
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!isDisabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isDisabled]);

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
        <TextAreaAutoResize className={styles.TextArea}
                            placeholder="Write a message here..."
                            value={content}
                            minRows={1}
                            maxRows={5}
                            ref={textareaRef}
                            disabled={isDisabled}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
        ></TextAreaAutoResize>
      </div>
      <button type="button"
              className={styles.Button}
              onClick={handleSubmit}
              disabled={isDisabled || content.trim() === ''}
      >
        <SendIcon/>
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
