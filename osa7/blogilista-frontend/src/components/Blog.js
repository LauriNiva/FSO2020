import React, { useState } from 'react';
import { commentABlog, deleteABlog, likeABlog } from '../reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNotification } from '../reducers/notificationReducer';

const NewCommentForm = ({ blog }) => {
  const [newComment, setNewComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(commentABlog(blog.id, newComment));
    setNewComment('');
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <input
          name="comment"
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button>add comment</button>
      </form>
    </div>
  );
};

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserUsername = useSelector((state) => state.users.username);

  if (!blog) return null;

  const isOwner = currentUserUsername === blog.user.username;

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(likeABlog(updatedBlog));
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      try {
        dispatch(deleteABlog(blog));
        dispatch(setNotification(`Blog ${blog.title} deleted!`, 3));
        navigate('/');
      } catch (error) {
        dispatch(setNotification('Error: Could not delete the blog!'));
      }
    }
  };

  return (
    <div className="blog">
      <div className="blog-top">
        <div className="blog-content">
          <h2>{blog.title}</h2>

          <h3>Author: {blog.author}</h3>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
        </div>
        <div className="blog-extra">
          <div>
            Likes: {blog.likes}
            <button className='like-button' onClick={likeBlog}>Like</button>
          </div>
          <div>Added by: {blog.user.name}</div>
          {isOwner && (
            <button className="remove-button" onClick={() => removeBlog(blog)}>
              delete
            </button>
          )}
        </div>
      </div>
      <div className="comments">
        <div className="comments-top">
          <div>
            <h3>Comments</h3>
            <ul>
              {blog.comments &&
                blog.comments.map((comment) => {
                  return <li key={`${comment}${Math.random()}`}>{comment}</li>;
                })}
            </ul>
          </div>
          <NewCommentForm blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
