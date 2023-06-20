import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import alertContext from '../context/notes/Alertcontext'

export default function Login() {

  const [credentials, setcredentials] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const context = useContext(alertContext)
  const { setAlertParams } = context

  const handleSubmit = async (e) => {

    e.preventDefault()

    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          email: credentials.email,
          password: credentials.password
        }
      )
    });

    const json = await response.json();
    console.log(json)

    //   If loginned successfully then redirect to home page
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate('/')
      setAlertParams("Login Successfully", "success")
    }
    else {
      setAlertParams("Invalid Credentials", "danger")
    }
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setcredentials((oldcredentials) => ({
      ...oldcredentials,
      [name]: value
    }))
  }

  return (
    <div className='container'>
      <h1 className='my-2'>Login To Your Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' className="form-control" onChange={handleOnChange} id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" onChange={handleOnChange} id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
