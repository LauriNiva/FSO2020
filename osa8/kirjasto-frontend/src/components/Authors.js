import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const BirthyearForm = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  const submit = (e) => {
    e.preventDefault();
    updateAuthor({ variables: { name, setBornTo: parseInt(born) } });
    setBorn('');
    setName('');
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

const Authors = (props) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthyearForm />
    </div>
  );
};

export default Authors;
