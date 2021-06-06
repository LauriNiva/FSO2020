import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from './services/notes';
import loginService from './services/login';
import Notification from "./components/Notification";
import Footer from './components/Footer';
import Noteform from './components/Noteform';
import Loginform from "./components/Loginform";



const App = (props) => {

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("a new note...");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            });
    }, []);


    const toggleImportanceOf = (id) => {
        const note = notes.find(n => n.id === id);
        const changedNote = { ...note, important: !note.important };

        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            }).catch(error => {
                setErrorMessage(
                    `Note "${note.content}" was already removed from server`
                );
                setTimeout(() => {
                    setErrorMessage(null);
                }, 5000);
                setNotes(notes.filter(n => n.id !== id));
            });
    };

    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        };

        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote));
                setNewNote("");
            });
    };

    const handleNoteChange = (e) => {
        console.log(e.target.value);
        setNewNote(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username, password
            });
            setUser(user);
            setUsername('');
            setPassword('');
        } catch {
            setErrorMessage('wrong credentials');
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000);
        }
    }
    
    const notesToShow = showAll ? notes : notes.filter(note => note.important);
    
    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            {user === null  
                ?<Loginform handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
                :<div>
                    <p>{user.name} logged in</p>
                    {<Noteform addNote={addNote} newNote={newNote} handleNoteChange={handleNoteChange} />}
                </div>
            }
                      
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
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