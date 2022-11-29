import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries';

const BirthyearForm = ({ authors }) => {
  const [name, setName] = useState(authors[0]?.name);
  const [born, setBorn] = useState('');

  const [updateAuthor] = useMutation(UPDATE_AUTHOR);

  const submit = (e) => {
    e.preventDefault();
    updateAuthor({ variables: { name, setBornTo: parseInt(born) } });
    setBorn('');
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          {/* <input value={name} onChange={(e) => setName(e.target.value)} /> */}
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
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

const Authors = ({ show, token }) => {
  const { data, loading, error } = useQuery(ALL_AUTHORS);

  if (!show) {
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
      {token && <BirthyearForm authors={data.allAuthors} />}
    </div>
  );
};

export default Authors;
