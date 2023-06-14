import React ,{useContext} from 'react'
import noteContext from '../context/notes/Notecontext'
import Noteitem from './Noteitem'

export default function Notes() {    
  const context = useContext(noteContext)
  const {notes, setnotes} = context
  return (
    <div>
        <div className="row">
          <h1>Your Notes</h1>
          {notes.map((note)=>{
            return <Noteitem note={note}/>
          })}        
        </div> 
    </div>
  )
}
