import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

function AnecdoteList() {

  const anecdotes = useSelector(state => state.anecdotes.slice()); //.slice() luo kopion arraysta, jotta sitä voi muokata(.sort)

  const dispatch = useDispatch();

  const anecdoteFilter = useSelector(state => state.filter.filter);

  const filterAnecdotes = (a) => {
    if(anecdoteFilter === '') return true;
    return a.content.toString().toLowerCase().includes(anecdoteFilter.toLowerCase());
  };

  const sortAnecdotes = (a,b) => {
    if(a.votes > b.votes) return -1;
    if(a.votes < b.votes) return 1;
    return 0;
  };

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(voteAnecdote(anecdote.id));
    dispatch(setNotification(`You voted: "${anecdote.content}"`, 5));
  };

  return (
    <div>
      {anecdotes.filter(filterAnecdotes).sort(sortAnecdotes).map(anecdote =>
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