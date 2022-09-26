import React from 'react';

function User({ user }) {

  console.log('---user---: ', user);

  if(!user) return <div></div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <li>
        {user.blogs.map((blog) => (
          <ul key={blog.id}>{blog.title}</ul>
        ))}
      </li>
    </div>
  );
}

export default User;
