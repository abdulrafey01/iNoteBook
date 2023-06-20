import NoteContext from "./Notecontext"
import { useState } from "react";

const NoteProvider = ({ children }) => {
  const host = 'http://localhost:5000/'
  const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)

  // Get all notes from Database
  const getNotes = async () => {
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setnotes(json)

  }

  // Add a note
  const addNote = async (userNote) => {
    // Api Call
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(
        {
          title: userNote.title,
          description: userNote.description,
          tag: userNote.tag
        }
      )
    });
    const json = await response.json();
    // Client Side AddNote
    setnotes(notes.concat(json))

    // Client Side AddNote
    // const newNote = {
    //   "_id": "64860276ef9c625d649cfeff",
    //   "user": "6482338264ea4c99319273ed",
    //   "title": userNote.title,
    //   "description": userNote.description,
    //   "tag": userNote.tag,
    //   "date": "2023-06-11T17:20:54.962Z",
    //   "__v": 0
    // }
    // setnotes(notes.concat(newNote))
    console.log("Note Added")
  }

  // Delete a note
  const deleteNote = async (id) => {
    // Api Call
    const response = await fetch(`${host}api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

    });
    // Client side Deletion
    const newNotes = notes.filter((note) => {
      return note._id !== id
    })
    setnotes(newNotes)
  }

  // Edit a note
  const editNote = async (userNote) => {

    // Code For Backend
    const response = await fetch(`${host}api/notes/updatenote/${userNote.eId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(
        {
          title: userNote.eTitle,
          description: userNote.eDescription,
          tag: userNote.eTag
        }
      )
    });

    //  Code for Frontend
    //  for (let index = 0; index < notes.length; index++) {
    //   const element = notes[index];
    //   if(element._id === userNote.eId){
    //     notes[index].title = userNote.eTitle
    //     notes[index].description = userNote.eDescription
    //     notes[index].tag = userNote.eTag
    //   }
    //  }'

    //  Code for Frontend
    setnotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note._id === userNote.eId) {
          return {
            ...note,
            title: userNote.eTitle,
            description: userNote.eDescription,
            tag: userNote.eTag,
          };
        }
        return note;
      });
    });

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, getNotes, editNote }}>
      {children}
    </NoteContext.Provider>
  );
}

export default NoteProvider