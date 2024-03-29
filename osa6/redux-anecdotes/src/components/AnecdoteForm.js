import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteForm(props) {

  const dispatch = useDispatch();

  const createNewAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';
    console.log('new anecdote', anecdote);
    // dispatch(createAnecdote(anecdote));
    props.createAnecdote(anecdote);
    // dispatch(setNotification(`You created anecdote: "${anecdote}"`, 5));
    props.setNotification(`You created anecdote: "${anecdote}"`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

// export default AnecdoteForm;
export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);