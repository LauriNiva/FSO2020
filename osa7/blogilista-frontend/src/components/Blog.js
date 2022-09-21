import React, { useState } from 'react';


const Blog = ({ blog, updateBlog, user, removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5
  };



  const [showFullInfo, setShowFullInfo] = useState(false);

  const toggleView = () => {
    setShowFullInfo(!showFullInfo);
  };

  const likeBlog = () => {
    const updatedBlog = blog;
    updatedBlog.likes++;
    updateBlog(updatedBlog);
  };

  const fullInfo = () => {
    const removeButtonStyle = {
      color: 'white',
      background: 'darkred',
      borderRadius: '5px',
    };
    return (
      <div>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}<button onClick={likeBlog}>Like</button></div>
        <div>{blog.user.name}</div>
        {(blog.user.username === user.username) &&
        <button style={removeButtonStyle} onClick={() => removeBlog(blog)}>Remove</button>}
      </div>
    );
  };


  return (
    <div style={blogStyle} className="blog">
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <button onClick={toggleView}>
        {showFullInfo ? 'Hide' : 'View'}
      </button>
      {showFullInfo
        ? fullInfo()
        : ''
      }
    </div>
  );
};

export default Blog;