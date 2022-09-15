import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdoteService';



function AnecdoteForm() {

  const dispatch = useDispatch();

  const createNewAnecdote = async (e) => {
    e.preventDefault();
    const anecdote = e.target.anecdote.value;
    e.target.anecdote.value = '';
    console.log('new anecdote', anecdote);
    const savedAnecdote = await anecdoteService.saveNew(anecdote)
    dispatch(createAnecdote(savedAnecdote));
    dispatch(showNotification(`You created anecdote: "${anecdote}"`));
    setTimeout(()=> dispatch(showNotification('')), 5000)
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

export default AnecdoteForm;