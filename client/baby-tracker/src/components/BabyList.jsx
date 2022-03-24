import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import BabyListItem from './BabyListItem';

export default function BabyList(props) {

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



  babyListItems = babies.map((baby) => {
    return(
      <BabyListItem
        name={baby.first_name}
        image={baby.picture_url}
      />
    )
  })


  return(
    <ul>
      {babyListItems}
      <BabyListItem goToNewBabyPage={() => navigate("/newbaby")}/>
    </ul>
  )
}