import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/userReducer';

const Loginform = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(username, password));
      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(setNotification('Error: wrong username or password!', 3));
    }
  };

  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Loginform;
