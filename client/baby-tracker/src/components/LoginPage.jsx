import React, { useState } from "react";
import axios from 'axios'

import Button from './Button'

import './LoginPage.scss'

export default function RegistrationPage(props) {

   const [user, setUser] = useState({
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
      const {email, password } = user
      if (!email || !password) {
         console.log('Empty values!')
         return
      }
      axios.post('http://localhost:8080/api/auth/login', user, {
         withCredentials: true,
      })
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
      <h1>Login into your account</h1>
      <form id='login-form' onSubmit={(e) => e.preventDefault()}>
      <input
         className="login"
         type="text"
         name='email'
         placeholder="Enter email"
         value={user.email}
         onChange={handleChange}

      />
      <input
         className="login"
         type="password"
         name='password'
         placeholder="Enter password"
         value={user.password}
         onChange={handleChange}
      />
         <Button confirm onClick={handleSubmit}>Login!</Button>
      </form>
   </>
   )
}