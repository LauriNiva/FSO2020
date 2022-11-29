import { useApolloClient, useQuery } from '@apollo/client';
import { useState } from 'react';
import LoginForm from './LoginForm';
import PersonForm from './PersonForm';
import Persons from './Persons';
import PhoneForm from './PhoneForm';
import { ALL_PERSONS } from './queries';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);

  const result = useQuery(ALL_PERSONS, { pollInterval: 0 });
  const client = useApolloClient();

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  if(!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default App;
