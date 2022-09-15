import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const anecdotes = await axios.get(baseUrl);
  return anecdotes.data;
};

const saveNew = async (content) => {
  const newAnecdote = { content, votes: 0};
  const savedAnecdote = await axios.post(baseUrl, newAnecdote);
  return savedAnecdote.data;
};

export default { getAll, saveNew };