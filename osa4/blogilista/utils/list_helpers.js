const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length) return 0;

  const reducer = (total, blog) => total + blog.likes;

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {

  if (blogs.length === 1) return blogs[0];

  return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite
    , blogs[0]);

  
}



module.exports = {
  dummy, totalLikes, favoriteBlog
};
