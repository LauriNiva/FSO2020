import { createSlice } from "@reduxjs/toolkit";


//const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const anecdotesAtStart = [];
//const initialState = anecdotesAtStart.map(asObject);
const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
      const newAnecdote = action.payload;
      state.push(newAnecdote)
    },
    voteAnecdote: (state, action) => {
      const id = action.payload;
      const anecdoteToVote = state.find(a => a.id === id);
      anecdoteToVote.votes++;
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  }
});

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;