import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../context/userContext";

import Button from './Button';

import "./Navbar.scss";

export default function Navbar(props) {

  const { userContextEmail, setUserEmail, userContextFirstName, setUserFirstName } = useContext(UserContext)

  let navigate = useNavigate();
  
  const handleLogout = () => {
    axios.post('http://localhost:8080/api/auth/logout')
    .then(() => {
      setUserEmail('')
      setUserFirstName('')
      navigate("/login")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  if (userContextFirstName) {
    return(
      <nav>
        <h4 className='username align-middle'>Hello, {userContextFirstName}!</h4>
        <Button danger onClick={handleLogout}>Logout</Button>
      </nav>
    )
  } else {
    return(
      <nav>
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </nav>
    )
  }
}