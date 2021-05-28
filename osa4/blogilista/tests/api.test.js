const mongoose = require ('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog.model');
const helper = require('./test_helpers');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('returns correct ammount of blogs', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body).toHaveLength(helper.initialBlogs.length);
});

test('blog identifier is formatted as id', async () => {
  const res = await api.get('/api/blogs');
  expect(res.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});