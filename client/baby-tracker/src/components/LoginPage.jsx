import React, { useState, useContext } from "react";
import axios from 'axios'
import { UserContext } from '../context/userContext'
import { useNavigate } from "react-router-dom";

import Button from './Button'

import './LoginPage.scss'

export default function RegistrationPage(props) {

   let navigate = useNavigate();
   
   const { userContextEmail, setUserEmail } = useContext(UserContext)

   const { userContextFirstName, setUserFirstName } = useContext(UserContext)

   const [user, setUser] = useState({
      email: '',
      password: ''
   })

   const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value
      setUser(prev => ({...user, [name]: value}))
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
         const { email:emailFromServer, first_name} = result.data.user
         setUserEmail(emailFromServer)
         setUserFirstName(first_name)
         navigate("/user")
      })
      .catch((error) => {
         console.log(error)
      })
   }

   return(
      <section className="section">
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
         <Button 
            confirm 
            onClick={handleSubmit}
         >
            Login!
         </Button>
      </form>
   </section>
   )
}