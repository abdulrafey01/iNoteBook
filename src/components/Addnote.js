import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/Notecontext'
import alertContext from '../context/notes/Alertcontext'


export default function Addnote() {
    const [userNote, setuserNote] = useState({ title: '', description: '', tag:'' })
    const context = useContext(noteContext)
    const {addNote} = context

    
    const alContext = useContext(alertContext)
    const {setAlertParams} = alContext

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
        setAlertParams("Note Added", "success")

        setuserNote({ title: '', description: '', tag:'' })

        document.getElementById('title').value = ''
        document.getElementById('description').value = ''
        document.getElementById('tag').value = ''
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
                <div className="mb-3 my-3">
                    <label htmlFor=" tag" className="form-label">Add  Tag</label>
                    <input type="text" name='tag' onChange={handleOnChange} className="form-control" id="tag" />
                </div>              
                <button disabled={userNote.title.length<5 || userNote.description.length<5} type="button" className="btn btn-primary" onClick={addNoteBtn}>Add Note</button>
            </div>
        </>
    )
}
