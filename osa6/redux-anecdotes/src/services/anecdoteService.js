import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const anecdotes = await axios.get(baseUrl);
  console.log('anecdotes', anecdotes)
  return anecdotes.data;
};

const saveNew = async (content) => {
  const newAnecdote = { content, votes: 0};
  const savedAnecdote = await axios.post(baseUrl, newAnecdote);
  return savedAnecdote.data;
};

const voteAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  const anecdoteToUpdate = response.data;
  anecdoteToUpdate.votes++;

  const updatedAnecdote = await axios.put(`${baseUrl}/${id}`, anecdoteToUpdate)
  return updatedAnecdote.data;
}

export default { getAll, saveNew, voteAnecdote };