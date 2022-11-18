import { useQuery } from '@apollo/client';
import { useState } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import { ALL_PERSONS } from './queries';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const result = useQuery(ALL_PERSONS, { pollInterval: 0 });

  if (result.loading) {
    return <div>loading...</div>;
  }

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;

  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default App;
