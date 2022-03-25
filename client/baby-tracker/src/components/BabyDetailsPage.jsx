import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import LogList from "./LogList";
import "./BabyDetailsPage.scss"


export default function BabyDetailsPage(props) {

  const { userContextBaby, setUserBaby } = useContext(UserContext)

  console.log(userContextBaby)

  return(
    <div className="row align-items-start">
      <section className="section col">
        Test
      </section>
      <section className="detailMoreSection">
        <LogList />
      </section>
    </div>
  )
}