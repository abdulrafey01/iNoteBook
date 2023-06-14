import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/Notecontext'


export default function Addnote() {
    const [userNote, setuserNote] = useState({ title: '', description: '' })
    const context = useContext(noteContext)
    const {addNote} = context
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setuserNote((userNote) => ({
             ...userNote,
              [name]: value
         }))
    }

    const addNoteBtn = (e)=>{
        addNote(userNote)
        e.preventDefault()
        document.getElementById('title').value = ''
        document.getElementById('description').value = ''

    }

    return (
        <>
            <div className="my-3">
                <h1>Add Note</h1>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Add Title</label>
                    <input type="text" name='title' onChange={handleOnChange} className="form-control" id="title" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Add Description</label>
                    <textarea className="form-control" onChange={handleOnChange} name='description' id="description" rows="3"></textarea>
                </div>
                <button type="button" className="btn btn-primary" onClick={addNoteBtn}>Add Note</button>
            </div>
        </>
    )
}
