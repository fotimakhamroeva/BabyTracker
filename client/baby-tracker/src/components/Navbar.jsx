import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../context/userContext";

import Button from './Button';

import "./Navbar.scss";

export default function Navbar(props) {

  const { email } = useContext(UserContext)

  const { handleLogin, handleRegister } = props

  let navigate = useNavigate();

  if (email) {
    return(
      <nav>
        <span className='username'>Hello, {email}!</span>
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