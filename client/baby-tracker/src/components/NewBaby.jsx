import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from './Button'

import './NewBaby.scss'

export default function NewBaby(props) {

  let navigate = useNavigate();

  const [baby, setBaby] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    location_of_birth: '',
    picture_url: ''
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBaby(prev => ({...baby, [name]: value}))
  }

  const handleSubmit = () => {
    const { first_name, last_name, date_of_birth, location_of_birth, picture_url } = baby
    if (!first_name || !last_name || !date_of_birth || !location_of_birth) {
      console.log('Empty values!')
      return
    }
    console.log(baby)
    axios.post('http://localhost:8080/api/baby/', baby, {
      withCredentials: true,
    })
    .then((result) => { 
      console.log(result.data)
      navigate("/user")
      })
    .catch((error) => {
      console.log(error)
    })
  }

  return(
    <>
      <h1>Add baby information here</h1>
      <form id='new-baby-form' onSubmit={(e) => e.preventDefault()}>
        <div className="new-baby">
          <div className="information">
            <input
              className="new-baby-details"
              type="text"
              name='first_name'
              placeholder="Enter first name"
              value={baby.firstName}
              onChange={handleChange}
            />
            <input
              className="new-baby-details"
              type="text"
              name='last_name'
              placeholder="Enter last name"
              value={baby.lastName}
              onChange={handleChange}
            />
            <input
              className="new-baby-details"
              type="text"
              name='date_of_birth'
              placeholder="Enter date of birth"
              value={baby.dateOfBirth}
              onChange={handleChange}
            />
            <input
              className="new-baby-details"
              type="text"
              name='location_of_birth'
              placeholder="Enter location of birth"
              value={baby.locationOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="picture-container">
            <input
                className="new-baby-details"
                type="text"
                name='picture_url'
                placeholder="Enter picture url"
                value={baby.picture_url}
                onChange={handleChange}
              />
          </div>
        </div>
        <Button className='save-button' confirm onClick={handleSubmit}>Add Baby!</Button>
      </form>
    </>
  )
}