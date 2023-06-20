import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/Notecontext'
import alertContext from '../context/notes/Alertcontext'



export default function Noteitem(props) {
    const {note, updateNote} = props
    const context = useContext(noteContext)
    const {deleteNote} = context

    
    const alContext = useContext(alertContext)
    const {setAlertParams} = alContext

    const deleteNoteBtn = ()=>{
        deleteNote(note._id)
        setAlertParams("Note Deleted", "danger")

    }
    return (
        <div className='col-md-3'>
            <div className="card my-3 " >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-trash mx-2" onClick={deleteNoteBtn}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
            </div>
        </div>
    )
}
