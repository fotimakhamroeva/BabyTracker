import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

import BabyListItem from './BabyListItem';

export default function BabyList(props) {

  const [babies, setBabies] = useState([])

  let babyListItems = []

  useEffect(() => {
    Promise.all(
      axios.get("http://localhost:8080/api/baby/", {
        withCredentials: true
      })
      .then((result) => {
        console.log('babies:', result.data)
        setBabies(result.data)
      })
    )
  }, [])

  // console.log('babies:', babies)


  babyListItems = babies.map((baby) => {
    console.log('correctly rendered name:', baby.first_name)
    return(
      <BabyListItem
        name={baby.first_name}
        image={baby.image}
      />
    )
  })

  return(
    <ul>
      {babyListItems}
      <BabyListItem />
    </ul>
  )
}