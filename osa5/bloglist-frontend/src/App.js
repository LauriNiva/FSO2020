import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Blog from './components/Blog';
import Loginform from './components/Loginform';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login.service';

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);



  const [notificationMessage, setNotificationMessage] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);




  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notificationService = (notification) => {
    setNotificationMessage(notification);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.loginUser(
        { username, password }
      );
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
  }

  const createNewBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog);
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(savedBlog));
      notificationService(`New blog added: ${savedBlog.title}`);
    } catch (error) {
      notificationService('Error: Could not create a new blog!');
    }
  };

  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate);
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : blogToUpdate));
    } catch (error) {
      notificationService('Error: Could not update the blog!');
    }
  };

  const removeBlog = async (blogToDelete) => {
    if(window.confirm(`Remove blog ${blogToDelete.title}?`)){
      try {
        await blogService.remove(blogToDelete);
        notificationService(`Blog ${blogToDelete.title} deleted!`);
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id));
      } catch (error) {
        notificationService('Error: Could not delete the blog!');
      }
    }
  };
  

  const compareLikes = (a, b) => {
    if (a.likes > b.likes) return -1;
    if (a.likes < b.likes) return 1;
    return 0;
  }


  const blogList = () => {
    return (
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Togglable buttonLabel="Create" ref={blogFormRef}>
          <NewBlogForm handleNewBlog={createNewBlog} />
        </Togglable>
        <div>
          {blogs.sort(compareLikes).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} removeBlog={removeBlog} />
          )}
        </div>
      </div>
    )
  }


  return (
    <div>
      <div className="top-container">
        <h1>Blog. list</h1>
        <Notification message={notificationMessage} />
      </div>

      { !user
        ? <Loginform handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        : blogList()
      }


    </div>
  )
}

export default App