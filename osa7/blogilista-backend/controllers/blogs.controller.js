const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    _id: 1,
  });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user;
  const blog = new Blog(request.body);
  if (!blog.likes) blog.likes = 0;

  blog.user = user._id;

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog);
  await user.save();

  await savedBlog.populate('user', { username: 1, name: 1, _id: 1 });

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  if (user.id !== blog.user.toString()) {
    return response.status(401).json({ error: 'invalid user' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  user.blogs = user.blogs.filter((blog) => blog !== request.params.id);
  await user.save();
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1, _id: 1 });
  response.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  const newComment = request.body.comment;

  const blogToComment = await Blog.findById(request.params.id);
  blogToComment.comments
    ? blogToComment.comments.push(newComment)
    : blogToComment.comments = [newComment];
  blogToComment.save();
});

module.exports = blogsRouter;
