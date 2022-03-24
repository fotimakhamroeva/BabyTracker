import React, { useState } from "react";
import axios from 'axios'

import Button from './Button'

import './BabyPage.scss'

export default function BabyPage(props) {

  axios.get("http://localhost:8080/api/baby/", {
    withCredentials: true
  })
  .then((result) => {
    console.log(result.data)
  })

  return(
    <h1>Test</h1>
  )
}
