import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [updatedDesc, setUpdatedDesc] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null)

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeleteNote(noteId) {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function handleSelectNote(note) {
    setSelectedNoteId(note._id);
    setUpdatedDesc(note.description);
  }

  // TOOK HELP OF AI for this
  function handleUpdateNote(noteId) {
  axios.patch(`http://localhost:3000/api/notes/${noteId}`, {
    description: updatedDesc
  })
  .then(() => {
    setNotes(prev =>
      prev.map(note =>
        note._id === noteId
          ? { ...note, description: updatedDesc }
          : note
      )
    );
    setSelectedNoteId(null);
  })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="note-create-form">
        <input name="title" type="text" placeholder="Title" />
        <input name="description" type="text" placeholder="Description" />
        <button type="submit">Create note</button>
      </form>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">

              <h1>{note.title}</h1>

              {selectedNoteId === note._id ? (
                <>
                  <textarea
                    value={updatedDesc}
                    onChange={(e) => setUpdatedDesc(e.target.value)}
                  />

                  <button onClick={() => handleUpdateNote(note._id)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p>{note.description}</p>
                  <button onClick={() => handleSelectNote(note)}>Edit</button>
                </>
              )}

              <button onClick={() => handleDeleteNote(note._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;

//the CORS error is that error which tells that you can't access another site's data from your site.

//res.data contains two items: message and notes collection so to access only notes we write res.data.notes which gives and array

//without using useEffect our app component was re-rendering after every state change but with the hlp of useEffect the component only renders once. this stops the api call on every map index element and calls it once.
