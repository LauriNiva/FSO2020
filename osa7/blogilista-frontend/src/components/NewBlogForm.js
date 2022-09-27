import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ handleNewBlog }) => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!blogTitle || !blogAuthor || !blogUrl) {
      return;
    }

    const newBlog = { title: blogTitle, author: blogAuthor, url: blogUrl };
    handleNewBlog(newBlog);

    setBlogTitle('');
    setBlogAuthor('');
    setBlogUrl('');
  };

  return (
    <div className="new-blog-form">
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="new-blog-form-input">
          Title:
          <input
            name="title"
            type="text"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div className="new-blog-form-input">
          Author:
          <input
            name="author"
            type="text"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div className="new-blog-form-input">
          Url:
          <input
            name="url"
            type="text"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        All fields required
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;
