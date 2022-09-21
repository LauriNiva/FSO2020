const router = require('express').Router();
const Blog = require('../models/blog.model');
const User = require('../models/user.model');

router.post('/reset', async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  res.status(204).end();
});

module.exports = router;