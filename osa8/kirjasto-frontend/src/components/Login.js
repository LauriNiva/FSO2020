import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
      setTimeout(() => setError(''), 3000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('kirjasto-user-token', token);
      setPage('authors');
    }
  }, [result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username:{' '}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password:{' '}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={'password'}
          />
        </div>
        <button>Login</button>
      </form>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
};

export default Login;
