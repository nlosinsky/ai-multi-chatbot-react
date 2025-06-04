import styles from './Controls.module.css';

function Controls() {
  return (
    <div className={styles.Controls}>
      <div className={styles.TextAreaContainer}>
        <textarea className={styles.TextArea} placeholder="Write a message here..."></textarea>
      </div>
      <button type="button" className={styles.Button}>
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
