const mongoose = require ('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const helper = require('./test_helpers');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  await User.deleteMany({});
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

  await api
    .post('/api/blogs')
    .send(helper.singleBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtTheEnd = await api.get('/api/blogs');
  expect(blogsAtTheEnd.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogsAtTheEnd.body.map(blog => blog.title)).toContain("New Blog For New Coders");

});

test('blog without likes value gets 0 likes', async () => {
  const singleBlogWithoutLikes = {
    title: "New Blog For New Coders",
    author: "Makes C. Blogs",
    url: "http://www.amazingfakeurl.blog"
  };

  await api
  .post('/api/blogs')
  .send(singleBlogWithoutLikes)
  .expect(201)
  .expect('Content-Type', /application\/json/);

  const singleBlogWithZeroLikes = await Blog.findOne({title: "New Blog For New Coders"});
  expect(singleBlogWithZeroLikes.likes).toBe(0);

});

test('blog without title returns 400', async () => {
  const singleBlogWithoutTitle = {
    author: "Makes C. Blogs",
    url: "http://www.amazingfakeurl.blog",
    likes: 4
  };

  await api
  .post('/api/blogs')
  .send(singleBlogWithoutTitle)
  .expect(400);
});

test('blog without url returns 400', async () => {
  const singleBlogWithoutUrl = {
    title: "New Blog For New Coders",
    author: "Makes C. Blogs",
    likes: 4
  };

  await api
  .post('/api/blogs')
  .send(singleBlogWithoutUrl)
  .expect(400);
});

test('delete with valid id returns 204 and removes the blog', async () => {
  const validBlog = await Blog.findOne({});

  await api
  .delete(`/api/blogs/${validBlog._id}`)
  .expect(204);

  const blogsAtTheEnd = await Blog.find({});
  const idsAtTheEnd = blogsAtTheEnd.map(blog => blog._id);
  expect(idsAtTheEnd).not.toContainEqual(validBlog._id);
});

test('updating blog works', async () => {
  const blogToUpdate = await Blog.findOne({});
  blogToUpdate.likes = 16;
  console.log(`blogToUpdate`, blogToUpdate)

  await api
  .put(`/api/blogs/${blogToUpdate._id}`)
  .send(blogToUpdate._doc)

  const updatedBlog = await Blog.findById(blogToUpdate._id);
  console.log(`updatedBlog`, updatedBlog)
  expect(updatedBlog.likes).toBe(16);

});

test('valid user is added', async () => {
  const usersAtStart = await User.find({});

  const newUser = { username: "Jane", name: "Jane Doe", password: "sikret" };

  await api.post('/api/users')
    .send(newUser)
    .expect(200)

  const usersAtEnd = await User.find({});

  expect(usersAtEnd.map(user => user.username)).toContain('Jane');
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

});

test('user with too short password is not added and returns 400', async () => {
  const usersAtStart = await User.find({});

  const newUser = { username: "John", name: "John Doe", password: "pw" };

  await api.post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await User.find({});

  expect(usersAtEnd).toHaveLength(usersAtStart.length);

});

afterAll(() => {
  mongoose.connection.close();
});