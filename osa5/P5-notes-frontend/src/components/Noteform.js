import React, { useState } from 'react';

const Noteform = ({ createNote }) => {

  const [newNote, setNewNote] = useState('');

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    });

    setNewNote('');
  };

  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>

    </div>
  );
};

export default Noteform;
