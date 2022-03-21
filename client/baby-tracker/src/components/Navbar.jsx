import React from "react";
import Button from './Button';

import "./Navbar.scss";

export default function Navbar(props) {


  if (props.username) {
    return(
      <nav>
        <span className='username'>Hello, {props.username}!</span>
        <Button danger>Logout</Button>
      </nav>
    )
  } else {
    return(
      <nav>
        <Button confirm>Login</Button>
        <Button confirm>Register</Button>
      </nav>
    )
  }
}