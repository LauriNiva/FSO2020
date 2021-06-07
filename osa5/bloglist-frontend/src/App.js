import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Loginform from './components/Loginform';
import blogService from './services/blogs';
import loginService from './services/login.service';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

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
      setUsername('');
      setPassword('');

    } catch (error) {
      console.log('login error: ' + error)
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedUser');
  }
  

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
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