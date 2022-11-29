import React from 'react';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS, CURRENT_USER } from '../queries';

export const Recommend = ({ show }) => {


  const { data, error, loading } = useQuery(CURRENT_USER);
  const books = useQuery(ALL_BOOKS);

  if (!show) return null;

  if (loading || books.loading) return <div>loading...</div>


  const booksToShow = books.data.allBooks.filter((book) =>
    book.genres.includes(data.me.favoriteGenre)
  );

  return (
    <div>
      <h2>Suositukset sinulle {data.me.username}</h2>
      <p>
        suosikkigenresi <b>{data.me.favoriteGenre}</b> perusteella:
      </p>
      <table>
        <tbody>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
