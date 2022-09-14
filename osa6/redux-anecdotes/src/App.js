import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id));
  }

  const createNewAnecdote = (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';
    console.log('new anecdote', anecdote);
    dispatch(createAnecdote(anecdote));
  };

  const sortAnecdotes = (a,b) => {
    if(a.votes > b.votes) return -1;
    if(a.votes < b.votes) return 1;
    return 0;
    
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(sortAnecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App