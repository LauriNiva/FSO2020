import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';
import { useState } from 'react';

const Books = (props) => {
  const { data, error, loading } = useQuery(ALL_BOOKS);
  const [chosenGenre, setChosenGenre] = useState(null);

  console.log('data', data)

  const genreBooks = useQuery(ALL_BOOKS, {
    variables: { genre: chosenGenre ? chosenGenre : null },
  });

  console.log('genre', genreBooks.data);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  const books = data.allBooks;

  // const booksToShow = chosenGenre
  //   ? books.filter((book) => book.genres.includes(chosenGenre))
  //   : books;

  const booksToShow = chosenGenre ? genreBooks.data?.allBooks : books;

  console.log('toshow', booksToShow);

  const genreButtons = () => {
    if (!books) return null;
    const genres = new Set();
    books.forEach((book) => {
      book.genres.forEach((genre) => genres.add(genre));
    });

    return [
      <button
        style={{ fontWeight: chosenGenre ? 'normal' : 'bold' }}
        key={'allgenres'}
        onClick={() => setChosenGenre(null)}
      >
        Kaikki genret
      </button>,
    ].concat(
      [...genres].map((genre) => (
        <button
          key={genre}
          style={{ fontWeight: chosenGenre === genre ? 'bold' : 'normal' }}
          onClick={() => setChosenGenre(genre)}
        >
          {genre}
        </button>
      ))
    );
  };

  return (
    <div>
      <h2>books</h2>
      {genreButtons()}
      {genreBooks.loading ? (
        <div>...</div>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Published</th>
            </tr>
            {booksToShow?.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
