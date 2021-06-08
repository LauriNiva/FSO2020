import React, { useState, useEffect } from 'react';
import './App.css';
import Blog from './components/Blog';
import Loginform from './components/Loginform';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login.service';

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  
  const[notificationMessage, setNotificationMessage] = useState(null);

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

  const handleNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = { title: blogTitle, author: blogAuthor, url: blogUrl }
      const savedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(savedBlog));
      notificationService(`New blog added: ${savedBlog.title}`);
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
    } catch (error) {
      notificationService('Error: Could not create a new blog!');
    }

  }
  


  const blogList = () => {
    return (
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <NewBlogForm  handleNewBlog={handleNewBlog} blogTitle={blogTitle} setBlogTitle={setBlogTitle}
        blogAuthor={blogAuthor} setBlogAuthor={setBlogAuthor} blogUrl={blogUrl} setBlogUrl={setBlogUrl} />
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
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