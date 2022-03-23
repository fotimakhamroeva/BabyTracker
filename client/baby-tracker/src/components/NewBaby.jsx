import axios from "axios";
import React, { useState } from "react";

import Button from './Button'

import './NewBaby.scss'

export default function NewBaby(props) {

  const [baby, setBaby] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    locationOfBirth: ''
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBaby(prev => ({...baby, [name]: value}))
    console.log(baby)
  }

  const handleSubmit = () => {
    const { firstName, lastName, dateOfBirth, locationOfBirth } = baby
    if (!firstName || !lastName || !dateOfBirth || !locationOfBirth) {
      console.log('Empty values!')
      return
    }
    axios.post('http://localhost:8080/api/baby/', baby)
    .then((result) => { 
      console.log(result.data)
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
              name='firstName'
              placeholder="Enter first name"
              value={baby.firstName}
              onChange={handleChange}
            />
            <input
              className="new-baby-details"
              type="text"
              name='lastName'
              placeholder="Enter last name"
              value={baby.lastName}
              onChange={handleChange}
            />
            <input
              className="new-baby-details"
              type="text"
              name='dateOfBirth'
              placeholder="Enter date of birth"
              value={baby.dateOfBirth}
              onChange={handleChange}
            />
            <input
              className="new-baby-details"
              type="text"
              name='locationOfBirth'
              placeholder="Enter location of birth"
              value={baby.locationOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="picture-container">
            Add picture here!
          </div>
        </div>
        <Button className='save-button' confirm onClick={handleSubmit}>Add Baby!</Button>
      </form>
    </>
  )
}