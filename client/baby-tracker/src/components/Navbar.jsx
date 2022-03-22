import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import Button from './Button';

import "./Navbar.scss";

export default function Navbar(props) {

  const { handleLogin, handleRegister } = props

  let navigate = useNavigate();

  if (props.username) {
    return(
      <nav>
        <span className='username'>Hello, {props.username}!</span>
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