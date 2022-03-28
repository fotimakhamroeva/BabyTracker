import React, { useState, useContext } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Button from './Button'
import './RegistrationPage.scss'

export default function RegistrationPage(props) {

   let navigate = useNavigate();

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
      // console.log(user)
   }

   const handleSubmit = () => {
      const { firstName, lastName, email, password } = user
      if (!firstName || !lastName || !email || !password) {
         console.log('Empty values!')
         return
      }
      axios.post('http://localhost:8080/api/auth/register', user, {
         withCredentials: true,
      })
      .then((result) => { 
         console.log(result.data)
         navigate("/login")
      })
      .catch((error) => {
         console.log(error)
      })
   }
   
   return(
      <section className="section row">
         <h2 className="pageHeading">Register new account here</h2>
         <form className="col-7" onSubmit={(e) => e.preventDefault()}>
            <div class="mb-3">
               <label for="firstName" class="form-label">First Name</label>
               <input
                  type="text"
                  id="firstName" 
                  name='firstName'
                  className="form-control" 
                  placeholder="Enter first name"
                  value={user.firstName}
                  onChange={handleChange}
               />
            </div>
            <div class="mb-3">
               <label for="lastName" class="form-label">Last Name</label>
               <input
                  className="form-control" 
                  type="text"
                  id="lastName" 
                  name='lastName'
                  placeholder="Enter last name"
                  value={user.lastName}
                  onChange={handleChange}
               />
            </div>
            <div class="mb-3">
               <label for="email" class="form-label">Email Address</label>
               <input
                  className="form-control" 
                  type="email"
                  id="email" 
                  name='email'
                  placeholder="Enter email"
                  value={user.email}
                  onChange={handleChange}
               />
            </div>
            <div class="mb-3">
               <label for="password" class="form-label">Password</label>
               <input
                  className="form-control" 
                  type="password"
                  id="password" 
                  name='password'
                  placeholder="Enter password"
                  value={user.password}
                  onChange={handleChange}
               />
            </div>
            <Button confirm onClick={handleSubmit}>Register!</Button>
         </form>
         <div className="col-3">
            <img src="/logo.gif" />
         </div>
      </section>
   )

}