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
    updateAnecdote: (state, action) => {
      const updatedAnecdote = action.payload;
      return state.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote)
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  }
});

export const { appendAnecdote, updateAnecdote,setAnecdotes } = anecdoteSlice.actions;

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

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(id);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;