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

test('blog is added to database', async () => {
  const newBlog = {
    title: "New Blog For New Coders",
    author: "Makes C. Blogs",
    url: "http://www.amazingfakeurl.blog",
    likes: 0
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtTheEnd = await api.get('/api/blogs');
  expect(blogsAtTheEnd.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtTheEnd.body.map(blog => blog.title)).toContain("New Blog For New Coders");

});

afterAll(() => {
  mongoose.connection.close();
});