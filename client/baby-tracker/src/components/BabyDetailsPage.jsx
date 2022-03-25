import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import LogList from "./LogList";
import BabyInfo from "./BabyInfo";
import "./BabyDetailsPage.scss"


export default function BabyDetailsPage(props) {

  const { userContextBaby, setUserBaby } = useContext(UserContext)

  console.log(userContextBaby)

  return(
    <div className="row align-items-start">
      <section className="col">
        <BabyInfo babyName="Bob" dateOfBirth="Jan 1st, 2022" birthLocation="Home" babyPic="https://cdn-icons-png.flaticon.com/512/191/191526.png" />
        <div className="detailBabyInfoSpace" />
        <section className="section">
          Log Options here
        </section>
        <div className="detailBabyInfoSpace" />
      </section>
      <section className="col">
        <LogList />
      </section>
    </div>
  )
}