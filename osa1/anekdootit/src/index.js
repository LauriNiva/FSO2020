import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <ShowAnecdote selected={selected} votes={votes} />
      <br/>
      <button onClick={() => setVotes(createNewVotes(votes,selected))} >Vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} >Next Anecdote</button>
      <MostVoted votes={votes} />
    </div>
    
  )
}

const MostVoted = ({votes}) => {

  let mostVotedIndex = 0;
  let mostVotes = 0;

  votes.forEach((anecdoteVotes, i) => {
    if(anecdoteVotes > mostVotes){
      mostVotedIndex = i;
      mostVotes = anecdoteVotes;
    }
  });

  return(
    <div>
      <h2>Anecdote with most votes</h2>
      <ShowAnecdote selected={mostVotedIndex} votes={votes} />
    </div>
  )
}

const ShowAnecdote = ({selected, votes}) => {
  return(
    <div>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
    </div>
  )
}

const createNewVotes = (old, selected) => {
  const newArr = [ ...old ];
  newArr[selected] += 1;
  console.log(newArr);
  return newArr;

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)