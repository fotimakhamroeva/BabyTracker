import React from "react";
import Button from './Button'

export default function Navbar(props) {


  if (props.username) {
    return(
      <>
        <span>Loggen in as {props.username}</span>
        <Button danger>Logout</Button>
      </>
    )
  } else {
    return(
      <>
        <Button confirm>Login</Button>
        <Button confirm>Register</Button>
      </>
    )
  }
}