import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";


export default function BabyDetailsPage(props) {

  const { userContextBaby, setUserBaby } = useContext(UserContext)

  console.log(userContextBaby)

  return(
    <h1>Test</h1>
  )
}