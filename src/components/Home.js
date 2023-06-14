import React, { useContext } from 'react'
import Notes from './Notes'
import Addnote from './Addnote'

export default function Home() {
  return (
      <div className="container">
        <Addnote />
        <Notes />
      </div>
  )
}
