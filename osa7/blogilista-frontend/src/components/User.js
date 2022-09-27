import React from 'react';
import { Link } from 'react-router-dom';

function User({ user }) {

  console.log('---user---: ', user);

  if(!user) return <div></div>;

  return (
    <div className="user-container">
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;
