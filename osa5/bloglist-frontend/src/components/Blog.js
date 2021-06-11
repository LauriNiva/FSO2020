import React, { useState } from 'react'


const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5
  }

  const [showFullInfo, setShowFullInfo] = useState(false);

  const toggleView = () => {
    setShowFullInfo(!showFullInfo);
  }
  

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleView}>
        {showFullInfo ? 'Hide' : 'View'}
      </button>
      {showFullInfo 
      ? <div>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes}<button>Like</button></div>
        <div>{blog.user.name}</div>
        </div>
      : ''
      }
    </div>
  )
};

export default Blog