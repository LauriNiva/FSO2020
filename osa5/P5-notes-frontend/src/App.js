import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import Notification from './components/Notification';
import Footer from './components/Footer';
import Noteform from './components/Noteform';
import Loginform from './components/Loginform';
import Togglable from './components/Togglable';



const App = () => {

  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  const noteFormRef = useRef();

  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      }).catch(() => {
        setErrorMessage(
          `Note "${note.content}" was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
      });
  };


  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user);
    } catch (error) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.setItem(
      'loggedNoteappUser', ''
    );
    noteService.setToken(null);
    setUser(null);
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);



  return (
    <div>
      <h1>Notes</h1>

      <Notification message={errorMessage} />

      {user === null
        ? <div>
          <Togglable buttonLabel='Log in'>
            <Loginform loginUser={handleLogin} />
          </Togglable>
        </div>
        : <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel='New note' ref={noteFormRef}>
            <Noteform createNote={addNote} />
          </Togglable>
        </div>
      }

      <div>
        <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>

      <Footer />
    </div>
  );
};

export default App;