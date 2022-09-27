import React from 'react';
import { deleteABlog, likeABlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const currentUserUsername = useSelector((state) => state.users.username);

  if (!blog) return null;

  const isOwner = currentUserUsername === blog.user.username;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: '1px solid',
    marginBottom: 5,
  };

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likeABlog(updatedBlog));
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        dispatch(deleteABlog(blog));
        dispatch(setNotification(`Blog ${blog.title} deleted!`, 3));
      } catch (error) {
        dispatch(setNotification('Error: Could not delete the blog!'));
      }
    }
  };

  const removeButtonStyle = {
    color: 'white',
    background: 'darkred',
    borderRadius: '5px',
  };

  return (
    <div style={blogStyle} className="blog">
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <div>{blog.url}</div>
      <div>
        Likes: {blog.likes}
        <button onClick={likeBlog}>Like</button>
      </div>
      <div>{blog.user.name}</div>
      {isOwner && (
        <button style={removeButtonStyle} onClick={() => removeBlog(blog)}>
          Remove
        </button>
      )}
      <h3>comments</h3>
      <ul>
        {blog.comments && blog.comments.map(comment => {
          return <li key={`${comment}${Math.random()}`}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
