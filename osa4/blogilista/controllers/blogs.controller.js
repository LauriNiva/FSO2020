const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // if(!request.token || !decodedToken.id) {
  //   return response.status(401).json({ error: 'token missing or invalid' });
  // }
  // const user = await User.findById(decodedToken.id);
  const user = request.user;

  const blog = new Blog(request.body);
  if (!blog.likes) blog.likes = 0;

  blog.user = user._id;

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog);
  await user.save();

  response
    .status(201)
    .json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) =>{
  const user = request.user;

  const blog = await Blog.findById(request.params.id);
  if( user.id !== blog.user.toString() ) {
    return response.status(401).json({ error: 'invalid user' })
  }

  await Blog.findByIdAndDelete(request.params.id);
  user.blogs = user.blogs.filter(blog => blog !== request.params.id);
  await user.save();
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