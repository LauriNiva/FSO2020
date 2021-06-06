import React from 'react'

const Noteform = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <div>
      <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
      
    </div>
  )
}

export default Noteform;
