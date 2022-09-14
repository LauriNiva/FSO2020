import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

function AnecdoteList() {

  const anecdotes = useSelector(state => state.anecdotes.slice()); //.slice() luo kopion arraysta, jotta sitä voi muokata(.sort)

  const dispatch = useDispatch();

  const sortAnecdotes = (a,b) => {
    if(a.votes > b.votes) return -1;
    if(a.votes < b.votes) return 1;
    return 0;
  };

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteAnecdote(anecdote.id));
    dispatch(showNotification(`You voted: "${anecdote.content}"`));
    setTimeout(()=> dispatch(showNotification('')), 5000)
  };

  return (
    <div>
      {anecdotes.sort(sortAnecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}

    </div>
  )
};

export default AnecdoteList;