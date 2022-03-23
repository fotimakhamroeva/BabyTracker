import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../context/userContext";

import Button from './Button';

import "./Navbar.scss";

export default function Navbar(props) {

  const { userContextEmail, userContextFirstName } = useContext(UserContext)

  const { handleLogin, handleRegister } = props

  let navigate = useNavigate();
  
  console.log("Navbar first name:", userContextFirstName)
  console.log("Navbar email:", userContextEmail)

  if (userContextFirstName) {
    return(
      <nav>
        <span className='username'>Hello, {userContextFirstName}!</span>
        <Button danger onClick={props.onClick}>Logout</Button>
      </nav>
    )
  } else {
    return(
      <nav>
        <Button confirm onClick={() => navigate("/login")}>Login</Button>
        <Button confirm onClick={() => navigate("/register")}>Register</Button>
      </nav>
    )
  }
}