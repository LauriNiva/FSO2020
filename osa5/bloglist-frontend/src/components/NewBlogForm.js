import React from 'react';

const NewBlogForm = ({ handleNewBlog, blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl }) => {
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          Title:
          <input name="title" type="text"
          value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input name="author" type="text"
          value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input name="url" type="text"
          value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
};

export default NewBlogForm;
