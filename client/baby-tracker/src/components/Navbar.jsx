import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../context/userContext";

import Button from './Button';

import "./Navbar.scss";

export default function Navbar(props) {

  const { userContextEmail, setUserEmail, userContextFirstName, setUserFirstName } = useContext(UserContext);
  const { isUserLoggedIn, setUserLoggedIn } = useContext(UserContext);

  let navigate = useNavigate();
  
  const handleLogout = () => {
    axios.post('http://localhost:8080/api/auth/logout', {
      withCredentials: true,
    })
    .then(() => {
      setUserEmail(undefined)
      setUserFirstName(undefined)
      setUserLoggedIn(false);
      navigate("/login")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  if (isUserLoggedIn) {
    return(
      <nav>
        <div className="logoContainer" onClick={() => navigate("/")}>
          <img src="/logo-2.gif" />
          <h3>Baby Tracker</h3>
        </div>
        <div className="navButtons">
          <h4 className='username align-middle'>Hello, {userContextFirstName}!</h4>
          <Button danger onClick={handleLogout}>Logout</Button>
        </div>
      </nav>
    )
  } else {
    return(
      <nav>
       <div className="logoContainer" onClick={() => navigate("/")}>
          <img src="/logo-2.gif" />
          <h3>Baby Tracker</h3>
        </div>
        <div className="navButtons">
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </div>
      </nav>
    )
  }
}