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
};


const mostBlogs = (blogs) => {

  const authors =  blogs.reduce((authors, blog) => {
    authors[blog.author] = (authors[blog.author] || 0) + 1;
    return authors;
  }, {});
  
  let mostActiveAuthor = Object.keys(authors)[0];

  for (const [author, numberOfBlogs] of Object.entries(authors)){
    if (numberOfBlogs > authors[mostActiveAuthor]) mostActiveAuthor = author;
  };

  return { "author": mostActiveAuthor, "blogs": authors[mostActiveAuthor] };

};

const mostLikes = (blogs) => {
  
  const authors = blogs.reduce((authors, blog) => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes;
    return authors; 
  }, {});

  let mostLikedAuthor = Object.keys(authors)[0];

  for (const [author, numberOfLikes] of Object.entries(authors)){
    if (numberOfLikes > authors[mostLikedAuthor]) mostLikedAuthor = author;
  };

  return { "author": mostLikedAuthor, "likes": authors[mostLikedAuthor] };
}



module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};
