import React, { useState } from "react";
import axios from 'axios'

import Button from './Button'

import './RegistrationPage.scss'

export default function RegistrationPage(props) {
   const [firstName, setFirstName] = useState('')
   const [lastName, setLastName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const register = (e) => {
      e.preventDefault()
      console.log(firstName, lastName, email, password)
      const userData = {
         first_name: firstName,
         last_name: lastName,
         email: email,
         password: password,
     }
     axios.post('http://localhost:8080/register', userData)
      .then((result) => { 
         console.log(result.data)
      })
      .catch((error) => {
         console.log(error)
      })
   }

  return(
   <>
   <h1>Register new account here</h1>
   <form id='registration-form'>
   <input
         className="registation"
         firstName="firstName"
         type="text"
         placeholder="Enter first name"
         onBlur={(e) => setFirstName(e.target.value)}
      />
      <input
         className="registation"
         lastName="lastName"
         type="text"
         placeholder="Enter last name"
         onBlur={(e) => setLastName(e.target.value)}
      />
      <input
         className="registation"
         email="email"
         type="text"
         placeholder="Enter email"
         onBlur={(e) => setEmail(e.target.value)}
      />
      <input
         className="registation"
         password="password"
         type="text"
         placeholder="Enter password"
         onBlur={(e) => setPassword(e.target.value)}
      />
      <Button confirm onClick={(e) => register(e)}>Register!</Button>
    </form>
   </>
  )
}