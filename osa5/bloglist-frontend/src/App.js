import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Loginform from './components/Loginform';
import NewBlogForm from './components/NewBlogForm';
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
    }
  }, []);

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
      console.log('login error: ' + error)
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
    } catch (error) {
      console.log('Error while creating a blog: ', error)
    }

  }
  


  const blogList = () => {
    return (
      <div>
        <h2>Blog. list</h2>
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
      { !user
        ? <Loginform handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        : blogList()
      }


    </div>
  )
}

export default App