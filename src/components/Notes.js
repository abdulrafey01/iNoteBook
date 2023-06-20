import React, { useContext, useEffect, useRef, useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/Notecontext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import alertContext from '../context/notes/Alertcontext'

export default function Notes() {
  const context = useContext(noteContext)
  const [modalNote, setmodalNote] = useState({eId:'', eTitle: '', eDescription: '', eTag:'' })
  const { notes, getNotes ,editNote} = context
  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  
  const alContext = useContext(alertContext)
  const {setAlertParams} = alContext

  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    console.log('Update note clicked')
    ref.current.click()
    setmodalNote({eId:currentNote._id ,eTitle: currentNote.title, eDescription:currentNote.description, eTag:currentNote.tag})
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setmodalNote((modalNote) => ({
         ...modalNote,
          [name]: value
     }))
}

const updateBtn = ()=>{
  editNote(modalNote)
  setAlertParams("Note Updated", "success")
  refClose.current.click()
}

  return (
    <>
      <Addnote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="mb-3 my-3">
                    <label htmlFor="eTitle" className="form-label">Add Title</label>
                    <input type="text" name='eTitle' onChange={handleOnChange} className="form-control" id="eTitle" value={modalNote.eTitle}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="eDescription" className="form-label">Add Description</label>
                    <textarea className="form-control" onChange={handleOnChange} name='eDescription' id="eDescription" rows="3" value={modalNote.eDescription}></textarea>
                </div>
                <div className="mb-3 my-3">
                    <label htmlFor="eTag" className="form-label">Add  Tag</label>
                    <input type="text" name='eTag' onChange={handleOnChange} className="form-control" id="eTag" value={modalNote.eTag}/>
                </div>            
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={modalNote.eTitle.length<5 || modalNote.eDescription.length<5} type="button" className="btn btn-primary" onClick={updateBtn}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <h1>Your Notes</h1>
          <div className="container mx-2">
            {notes.length===0 && 'No Notes To Display'}
          </div>
          {notes.map((note) => {
            return <Noteitem key={note._id} note={note} updateNote={updateNote} />
          })}
        </div>
      </div>
    </>
  )
}
