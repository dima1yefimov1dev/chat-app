import { useEffect, useState } from 'react';
import styles from './App.module.css';

import { ChatApp } from './components/chat';
import { socket } from './ultis/socket';
import { Login } from './components/registration-pae/login-page';

export interface Message {
  author: string;
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const handleConnect = () => {
      console.log(`Connected to the server with ID: ${socket.id}`);
    };
  
    const handleMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };
  
    const handleNewUser = (username: string) => {
      if (username !== user) {
        console.log(username, user);
        alert(`user ${username} has joined chat`);
      }
    };
  
    socket.on('connect', handleConnect);
    socket.on('chatMessage', handleMessage);
    socket.on('new user', handleNewUser);
  
    return () => {
      socket.off('connect', handleConnect);
      socket.off('chatMessage', handleMessage);
      socket.off('new user', handleNewUser);
    };
  }, [isLoggedIn, user]); // Added user to the dependency array

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <>
          <ChatApp messages={messages} user={user} />
        </>
      ) : (
        <Login setUser={setUser} setLogin={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;