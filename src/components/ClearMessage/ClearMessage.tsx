import { useState } from "react";
import styles from './ClearMessage.module.css';

type ClearMessageProps = {
  onClear: () => void;
  disabled?: boolean;
}

function ClearMessage({ onClear, disabled = false }: ClearMessageProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClearClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      // Auto-reset confirmation state after 3 seconds
      setTimeout(() => setIsConfirming(false), 3000);
      return;
    }

    // Clear from localStorage
    localStorage.removeItem('chat-messages');
    
    // Call the parent's onClear function
    onClear();
    
    // Reset confirmation state
    setIsConfirming(false);
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  return (
    <div className={styles.ClearMessage}>
      {!isConfirming ? (
        <button
          type="button"
          className={styles.ClearButton}
          onClick={handleClearClick}
          disabled={disabled}
          title="Clear chat history"
        >
          <TrashIcon/>
          <span>Clear History</span>
        </button>
      ) : (
        <div className={styles.Confirmation}>
          <span className={styles.ConfirmationText}>Are you sure?</span>
          <button
            type="button"
            className={`${styles.ConfirmButton} ${styles.ConfirmYes}`}
            onClick={handleClearClick}
          >
            Yes
          </button>
          <button
            type="button"
            className={`${styles.ConfirmButton} ${styles.ConfirmNo}`}
            onClick={handleCancel}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}

function TrashIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      height="16px" 
      viewBox="0 -960 960 960" 
      width="16px" 
      fill="currentColor"
    >
      <path d="M261-120q-24.75 0-42.375-17.625T201-180v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438v-570ZM367-266h60v-399h-60v399Zm166 0h60v-399h-60v399ZM261-750v570-570Z"/>
    </svg>
  );
}

export default ClearMessage;
