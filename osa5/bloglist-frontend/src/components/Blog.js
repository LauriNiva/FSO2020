import React, { useState } from 'react'


const Blog = ({ blog, updateBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5
  }

  const [showFullInfo, setShowFullInfo] = useState(false);

  const toggleView = () => {
    setShowFullInfo(!showFullInfo);
  };

  const likeBlog = () => {
    const updatedBlog = blog;
    updatedBlog.likes++;
    updateBlog(updatedBlog);
  };
  

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleView}>
        {showFullInfo ? 'Hide' : 'View'}
      </button>
      {showFullInfo 
      ? <div>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}<button onClick={likeBlog}>Like</button></div>
        <div>{blog.user.name}</div>
        </div>
      : ''
      }
    </div>
  )
};

export default Blog