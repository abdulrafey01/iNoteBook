import NoteContext from "./Notecontext"
import { useState } from "react";

const NoteProvider = ({ children }) => {
   
    const notesInitial = [
        {
          "_id": "64860251ef9c625d649cfefb",
          "user": "6482338264ea4c99319273ed",
          "title": "Tapola",
          "description": "I have to photostate BA papers",
          "tag": "Personal",
          "date": "2023-06-11T17:20:17.169Z",
          "__v": 0
        },
        {
          "_id": "64860269ef9c625d649cfefd",
          "user": "6482338264ea4c99319273ed",
          "title": "Title 2",
          "description": "I have to eat papers",
          "tag": "Personal",
          "date": "2023-06-11T17:20:41.300Z",
          "__v": 0
        },
        {
          "_id": "64860276ef9c625d649cfeff",
          "user": "6482338264ea4c99319273ed",
          "title": "Title 3",
          "description": "I have to drink water",
          "tag": "Personal",
          "date": "2023-06-11T17:20:54.962Z",
          "__v": 0
        },
        {
          "_id": "64860269ef990c625d649cfefd",
          "user": "6482338264ea4c99319273ed",
          "title": "Title 2",
          "description": "I have to eat papers",
          "tag": "Personal",
          "date": "2023-06-11T17:20:41.300Z",
          "__v": 0
        },
        {
          "_id": "64860276efgs9c625d649cfeff",
          "user": "6482338264ea4c99319273ed",
          "title": "Title 3",
          "description": "I have to drink water",
          "tag": "Personal",
          "date": "2023-06-11T17:20:54.962Z",
          "__v": 0
        },
        {
          "_id": "64860269efsfg9c625d649cfefd",
          "user": "6482338264ea4c99319273ed",
          "title": "Title 2",
          "description": "I have to eat papers",
          "tag": "Personal",
          "date": "2023-06-11T17:20:41.300Z",
          "__v": 0
        },
        {
          "_id": "64860276sgfef9c625d649cfeff",
          "user": "6482338264ea4c99319273ed",
          "title": "Title 3",
          "description": "I have to drink water",
          "tag": "Personal",
          "date": "2023-06-11T17:20:54.962Z",
          "__v": 0
        },
      ]
      const [notes, setnotes] = useState(notesInitial)

      // Add a note
      const addNote = (userNote)=>{
        const newNote = {
          "_id": "64860276ef9c625d649cfeff",
          "user": "6482338264ea4c99319273ed",
          "title": userNote.title,
          "description": userNote.description,
          "tag": "Personal",
          "date": "2023-06-11T17:20:54.962Z",
          "__v": 0
        }
        setnotes(notes.concat(newNote))
        console.log("Note Added")
      }

      // Delete a note
      const deleteNote = (id)=>{
        const newNotes = notes.filter((note)=>{
          return note._id!==id
        })
        setnotes(newNotes)
      }

      // Edit a note
    
    return (
        <NoteContext.Provider value={{notes,addNote, deleteNote}}>
            {children}
        </NoteContext.Provider>
    );
}

export default NoteProvider