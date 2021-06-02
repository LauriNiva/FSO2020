const usersRouter = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (req, res) => {
  const body = req.body;

  if(!body.password || body.password.length < 3){
    return res.status(400).json({ error: 'invalid password' });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);

  const user = new User({ 
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save()

  res.json(savedUser);
});

usersRouter.get('/', async (req, res) => { 
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, likes: 1, _id: 1});
  res.json(users);
});



module.exports = usersRouter;