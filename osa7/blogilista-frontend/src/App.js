import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Blog from './components/Blog';
import Loginform from './components/Loginform';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login.service';
import { setNotification } from './reducers/notificationReducer';
import { setInitialBlogs, createANewBlog } from './reducers/blogReducer';

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(state => state.blogs.slice());
  console.log('blogs', blogs);

  useEffect(() => {
    dispatch(setInitialBlogs());
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const notificationMessage = useSelector((state) => state.notifications.message);

  const blogFormRef = useRef();



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notificationService = (notification) => {
    dispatch(setNotification(notification, 3));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.loginUser({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      notificationService('Error: wrong username or password!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('loggedUser');
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

  const updateBlog = async (blogToUpdate) => {
    try {
      console.log(blogToUpdate);
      // const updatedBlog = await blogService.update(blogToUpdate);
      // setBlogs(
      //   blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : blogToUpdate))
      // );
    } catch (error) {
      notificationService('Error: Could not update the blog!');
    }
  };


  const compareLikes = (a, b) => {
    if (a.likes > b.likes) return -1;
    if (a.likes < b.likes) return 1;
    return 0;
  };

  const blogList = () => {

    const blogsToShow = blogs.sort(compareLikes);

    return (
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="Create" ref={blogFormRef}>
          <NewBlogForm handleNewBlog={createNewBlog} />
        </Togglable>
        <div>
          {blogsToShow.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              user={user}
            />
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
      </div>

      {!user ? (
        <Loginform
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        blogList()
      )}
    </div>
  );
};

export default App;
