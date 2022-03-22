import React, { useState } from "react";
import axios from 'axios'

import Button from './Button'

import './LoginPage.scss'

export default function RegistrationPage(props) {

 return(
  <>
  <h1>Login into your account</h1>
  <form id='login-form'>
      <input
        className="registation"
        email="email"
        type="text"
        placeholder="Enter email"
        // onBlur={(e) => setEmail(e.target.value)}
     />
     <input
        className="registation"
        password="password"
        type="text"
        placeholder="Enter password"
        // onBlur={(e) => setPassword(e.target.value)}
     />
     <Button confirm>Login!</Button>
   </form>
  </>
 )
}