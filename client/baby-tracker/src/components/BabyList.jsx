import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import BabyListItem from './BabyListItem';
import "./BabyList.scss";

export default function BabyList(props) {

  const { userContextBaby, setUserBaby } = useContext(UserContext)

  let navigate = useNavigate();

  const [babies, setBabies] = useState([])

  let babyListItems = []

  useEffect(() => {
    axios.get("http://localhost:8080/api/baby/", {
      withCredentials: true
    })
    .then((result) => {
      setBabies(result.data)
    })
  }, [])

  const goToBabyDetailsPage = (baby) => {
    setUserBaby(baby)
    navigate("/babydetails")
  }

  babyListItems = babies.map((baby) => {
    return(
      <div class="col-3 d-flex justify-content-center">
        <BabyListItem
          name={baby.first_name}
          image={baby.picture_url}
          handleClickOnBaby={goToBabyDetailsPage}
        />
      </div>
    )
  })

  return(
    <section className="section">
      <h2>Select your baby</h2>
      <ul className="row babyList">
        {babyListItems}
        <div class="col-3 d-flex justify-content-center">
          <BabyListItem goToNewBabyPage={() => navigate("/newbaby")}/>
        </div>
      </ul>
    </section>
  )
}