import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

function AnecdoteList() {

  const anecdotes = useSelector(state => state);

  const dispatch = useDispatch();


  const sortAnecdotes = (a,b) => {
    if(a.votes > b.votes) return -1;
    if(a.votes < b.votes) return 1;
    return 0;
  };

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteAnecdote(id));
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}

    </div>
  )
};

export default AnecdoteList;