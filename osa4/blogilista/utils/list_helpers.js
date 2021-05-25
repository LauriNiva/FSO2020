const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs.length) return 0;

  const reducer = (total, blog) => total + blog.likes;
  
  return blogs.reduce( reducer, 0);
}


module.exports = {
  dummy, totalLikes
};
