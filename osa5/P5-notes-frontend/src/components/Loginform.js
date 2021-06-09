import React, { useState } from 'react';

const Loginform = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
      loginUser(username, password);
      setUsername('');
      setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
    </div>
  )
}

export default  Loginform;