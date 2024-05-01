import { FC, FormEvent, useState } from "react";
import styles from './chat-app.module.css';
import { socket } from "../ultis/socket";
import { Message } from "../App";

interface Props {
  messages: Message[]
  user: string,
}

export const ChatApp: FC<Props> = ({ messages, user}) => {
  const [message, setMessage] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    socket.emit('chatMessage', message);

    setMessage('');
  };

  const checkIsUserSame = (message: Message) => {
    return user === message.author;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatBox}>
        <ul
          className={styles.list}
        >
          {messages.map((message, index) => (
            <li key={index}>
              <div 
                className={styles.message}
                style={{
                  backgroundColor: checkIsUserSame(message) ? 'lightblue' : ''
                }}
              >
                <p>{checkIsUserSame(message) ? 'ME: ' : message.author + ': '}</p>
                <p>{message.text}</p>
              </div>
              </li>
          ))}
        </ul>
        <div className={styles.formBox}>
          <form 
            action="" 
            className={styles.form}
            onSubmit={e => onSubmit(e)}
          >
            <input 
              className={styles.input} 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
            />
            <button 
              type="submit"
              className={styles.button}
            >
              Send
            </button>
          </form>
        </div>
      </div>


    </div>
  );
};