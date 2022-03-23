import React, { useState } from "react";
import axios from 'axios'

import Button from './Button'

import './RegistrationPage.scss'

export default function RegistrationPage(props) {

   const [user, setUser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
   })

   const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value
      setUser(prev => ({...user, [name]: value}))
      console.log(user)
   }

   const handleSubmit = () => {
      const { firstName, lastName, email, password } = user
      if (!firstName || !lastName || !email || !password) {
         console.log('Empty values!')
         return
      }
      axios.post('http://localhost:8080/api/auth/register', user)
      .then((result) => { 
         console.log(result.data)
      })
      .catch((error) => {
         console.log(error)
      })
      console.log('abc')
   }
   
   return(
      <>
      <h1>Register new account here</h1>
      <form id='registration-form' onSubmit={(e) => e.preventDefault()}>
      <input
            className="registation"
            type="text"
            name='firstName'
            placeholder="Enter first name"
            value={user.firstName}
            onChange={handleChange}
         />
         <input
            className="registation"
            type="text"
            name='lastName'
            placeholder="Enter last name"
            value={user.lastName}
            onChange={handleChange}
         />
         <input
            className="registation"
            type="text"
            name='email'
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
         />
         <input
            className="registation"
            type="password"
            name='password'
            placeholder="Enter password"
            value={user.password}
            onChange={handleChange}
         />
         <Button confirm onClick={handleSubmit}>Register!</Button>
      </form>
      </>
   )

}