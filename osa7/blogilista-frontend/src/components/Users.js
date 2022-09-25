import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../reducers/allUsersReducer';

function Users() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.allUsers);
  console.log('users', users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const UserRow = ({ username, numberOfBlogs }) => {
    return (
      <tr>
        <td>{username}</td>
        <td>{numberOfBlogs}</td>
      </tr>
    );
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              username={user.name}
              numberOfBlogs={user.blogs.length}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
