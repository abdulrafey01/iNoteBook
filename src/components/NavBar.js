import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Alert from './Alert';
import alertContext from '../context/notes/Alertcontext';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {
  let location = useLocation();

  const context = useContext(alertContext)
  const {alert} = context
  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              {!localStorage.getItem('token') ?
              <><Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link><Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link></>
              : <button onClick={handleLogout} className='btn btn-primary'>LogOut</button> }
            </form>
          </div>
        </div>
      </nav>
      <Alert alert={alert} />
    </>
  )
}
