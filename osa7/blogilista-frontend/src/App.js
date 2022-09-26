import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch, Link } from 'react-router-dom';
import './App.css';
import Blog from './components/Blog';
import Loginform from './components/Loginform';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import { setNotification } from './reducers/notificationReducer';
import { setInitialBlogs, createANewBlog } from './reducers/blogReducer';
import { logoutUser, setUser } from './reducers/userReducer';
import Users from './components/Users';
import User from './components/User';
import { getAllUsers } from './reducers/allUsersReducer';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs.slice());

  useEffect(() => {
    dispatch(setInitialBlogs());
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const user = useSelector((state) => state.users);

  const userMatch = useMatch('/users/:id');
  const allUsers = useSelector((state) => state.allUsers);
  const chosenUser =
    userMatch && allUsers.find((user) => user.id === userMatch.params.id);

  const blogMatch = useMatch('/blogs/:id');
  const chosenBlog =
    blogMatch && blogs.find((blog) => blog.id === blogMatch.params.id);

  const notificationMessage = useSelector(
    (state) => state.notifications.message
  );

  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const notificationService = (notification) => {
    dispatch(setNotification(notification, 3));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const createNewBlog = async (newBlog) => {
    try {
      dispatch(createANewBlog(newBlog));
      blogFormRef.current.toggleVisibility();
      notificationService(`New blog added: ${newBlog.title}`);
    } catch (error) {
      notificationService('Error: Could not create a new blog!');
    }
  };

  // const updateBlog = async (blogToUpdate) => {
  //   try {
  //     console.log(blogToUpdate);
  //     // const updatedBlog = await blogService.update(blogToUpdate);
  //     // setBlogs(
  //     //   blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : blogToUpdate))
  //     // );
  //   } catch (error) {
  //     notificationService('Error: Could not update the blog!');
  //   }
  // };

  const compareLikes = (a, b) => {
    if (a.likes > b.likes) return -1;
    if (a.likes < b.likes) return 1;
    return 0;
  };

  const blogList = () => {
    const blogsToShow = blogs.sort(compareLikes);

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 10,
      paddingBottom: 10,
      border: '1px solid',
      marginBottom: 5,
    };

    return (
      <div>
        <Togglable buttonLabel="Create" ref={blogFormRef}>
          <NewBlogForm handleNewBlog={createNewBlog} />
        </Togglable>
        <div>
          {blogsToShow.map((blog) => (
            <div key={blog.id} style={blogStyle} className="blog">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="top-container">
        <h1>Blog. list</h1>
        <Notification message={notificationMessage} />
        {!user ? (
          <Loginform />
        ) : (
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
        )}
      </div>
      <Routes>
        <Route path="/users/:id" element={<User user={chosenUser} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog blog={chosenBlog} />} />
        <Route path="/" element={user && blogList()} />
      </Routes>
    </div>
  );
};

export default App;
