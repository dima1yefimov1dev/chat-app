import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import { socket } from "../../ultis/socket";
import styles from './style.module.css';

interface Props {
  setUser: Dispatch<SetStateAction<string>>,
  setLogin: Dispatch<SetStateAction<boolean>>
}

export const Login: FC<Props> = ({setUser, setLogin}) => {
  const [username, setUsername] = useState('');

  const login = (e: FormEvent) => {
    e.preventDefault();
    setUser(username);
    setLogin(true);
    socket.emit('new user', {username});
  }

  const isDisabled = username.trim().length === 0;

  return (
    <div className={styles.box}>
      <form 
        action=""
        onSubmit={e => login(e)}
        className={styles.form}
      >
        <label 
          htmlFor="input"
          className={styles.label}  
        >
          Enter your nickname:
          <input 
            type="text"
            id="input"
            className={styles.input}
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </label>
        <button 
          type="submit"
          className={styles.btn}
          disabled={isDisabled}
        > 
          Sign Up
        </button>
      </form>
    </div>
  );
};