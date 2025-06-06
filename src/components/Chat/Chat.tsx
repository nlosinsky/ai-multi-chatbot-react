import { useEffect, useMemo, useRef } from "react";
import Markdown from 'react-markdown';
import type { Message } from '../../types';

import styles from './Chat.module.css';

type Group = [Message] | [Message, Message];

const WELCOME_MESSAGE_GROUP = [{
  role: 'assistant',
  content: 'Welcome to the AI Chatbot! How can I assist you today?'
}]

function Chat({messages}: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messagesGroups = useMemo(() => {
    return messages.reduce((groups: Group[], message) => {
      if (message.role === 'user') {
        groups.push([message]);
      } else {
        groups[groups.length - 1].push(message);
      }
      return groups;
    }, []);
  }, [messages]);

  const messagesWithWelcome = messages.length === 0 ? [WELCOME_MESSAGE_GROUP] : messagesGroups;

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage?.role === 'user') {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, [messages])

  return (
    <div className={styles.Chat}>
      {
        messagesWithWelcome.map((messages, groupIndex: number) => (
          <div key={groupIndex}
               className={styles.Group}
          >
            {
              messages.map(({role, content}, index) => (
                <div key={index}
                     data-role={role}
                     className={styles.Message}
                >
                  <Markdown>{content}</Markdown>
                </div>
              ))
            }
          </div>
        ))
      }

      <div ref={messagesEndRef}></div>
    </div>
  );
}

export default Chat;
