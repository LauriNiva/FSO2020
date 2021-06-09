import React from 'react'

const Noteform = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <div>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
      
    </div>
  )
}

export default Noteform;
