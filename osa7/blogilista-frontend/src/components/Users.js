import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Users() {
  const users = useSelector((state) => state.allUsers);

  return (
    <div>
      <h2>Users</h2>
      <div className="users-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
