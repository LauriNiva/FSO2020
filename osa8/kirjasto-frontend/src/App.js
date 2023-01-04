import { useState, useEffect } from 'react';
import { useSubscription, useApolloClient } from '@apollo/client';
import { gql } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import { Recommend } from './components/Recommend';

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        name
      }
      title
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('kirjasto-user-token');
    if (token) setToken(token);
  }, []);

  const logout = () => {
    setPage('authors');
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log(data.data.bookAdded);
      window.alert(
        `Uusi kirja lisättiin: ${data.data.bookAdded.title} (${data.data.bookAdded.author.name})`
      );
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
          </>
        )}
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Authors token={token} show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook token={token} show={page === 'add'} />
      <Login setPage={setPage} setToken={setToken} show={page === 'login'} />
      <Recommend token={token} show={page === 'recommend'} />
    </div>
  );
};

export default App;
