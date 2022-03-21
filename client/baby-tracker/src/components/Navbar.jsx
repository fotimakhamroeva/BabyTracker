import React from "react";
import Button from './Button';

import "./Navbar.scss";

export default function Navbar(props) {

  console.log(props.onClick)

  const login = function() {

  }

  const register = function() {
    
  }

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
        <Button confirm onClick={props.onClick}>Login</Button>
        <Button confirm onClick={props.onClick}>Register</Button>
      </nav>
    )
  }
}