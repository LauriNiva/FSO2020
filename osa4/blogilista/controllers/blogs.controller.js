const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const blogsRouter = require('express').Router();

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  if (!blog.likes) blog.likes = 0;

  const user = await User.findOne({});
  blog.user = user._id;

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog);
  await user.save();

  response
    .status(201)
    .json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) =>{
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) =>{
  const body = request.body;
  console.log(`request.body(put): `, request.body )
  const blog = { 
    title: body.title,
    author: body.author, 
    url: body.url, 
    likes: body.likes
  };
  
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true });
  response.json(updatedBlog);

});

module.exports = blogsRouter;