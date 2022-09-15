import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";


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
    appendAnecdote: (state, action) => {
      state.push(action.payload)
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

export const { appendAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(initialAnecdotes));
  }
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.saveNew(content);
    dispatch(appendAnecdote(createdAnecdote));
  };
};
export default anecdoteSlice.reducer;