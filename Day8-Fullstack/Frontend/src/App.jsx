import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: "test title 1",
      description: "desc 1",
    },
    {
      title: "test title 2",
      description: "desc 2",
    },
    {
      title: "test title 3",
      description: "desc 3",
    },
    {
      title: "test title 4",
      description: "desc 4",
    },
  ]);

  axios.get("http://localhost:3000/api/notes").then((res) => {
    setNotes(res.data.notes);
  });

  return (
    <>
      <div className="notes">
        {
          notes.map((note) => {
            return (
              <div className="note">
                <h1>{note.title}</h1>
                <p>{note.description}</p>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default App;

//the CORS error is that error which tells that you can't access another site's data from your site.
