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
    console.log(baby);

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

    <section className="section">
    <h2 className="pageHeading">Register your baby</h2>
    <form className="row" onSubmit={(e) => e.preventDefault()}>
      <div className="col-7">
      <div class="mb-3">
          <label for="first_name" class="form-label">First Name</label>
          <input
             type="text"
             id="first_name" 
             name='first_name'
             className="form-control" 
             placeholder="Enter first name"
             value={baby.firstName}
             onChange={handleChange}
          />
       </div>
       <div class="mb-3">
          <label for="last_name" class="form-label">First Name</label>
          <input
             className="form-control" 
             type="text"
             id="last_name" 
             name='last_name'
             placeholder="Enter last name"
             value={baby.lastName}
             onChange={handleChange}
          />
       </div>
       <div class="mb-3">
          <label for="date_of_birth" class="form-label">Date of Birth</label>
          <input
             className="form-control" 
             type="text"
             id="date_of_birth" 
             name='date_of_birth'
             placeholder="Enter date of birth"
             value={baby.dateOfBirth}
             onChange={handleChange}
          />
       </div>
       <div class="mb-3">
          <label for="location_of_birth" class="form-label">Location of Birth</label>
          <input
             className="form-control" 
             type="text"
             id="location_of_birth" 
             name='location_of_birth'
             placeholder="Enter location of birth"
             value={baby.locationOfBirth}
             onChange={handleChange}
          />
       </div>
       <div class="mb-3">
          <label for="picture_url" class="form-label">Location of Birth</label>
          <input
             className="form-control" 
             type="text"
             id="picture_url" 
             name='picture_url'
             placeholder="Enter picture url"
             value={baby.picture_url}
             onChange={handleChange}
          />
       </div>
       <Button confirm onClick={handleSubmit}>Add Baby</Button>
      </div>
      <div className="col-5 d-flex justify-content-center">
        <div className="new-baby-thumb rounded-circle">
          { (baby.picture_url) 
          ? <img src={baby.picture_url} className="new-baby-srcImage" alt="Avatar" />
          : <img src="/baby-new.png" className="new-baby-srcImage" alt="Avatar" />
          }
          <div className="baby-list__item-text-container rounded-circle">
            <h4 className="baby-list__item-text">{baby.first_name}</h4>
          </div>
        </div>
      </div>
    </form>
 </section>

   /*  <>
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
    </> */
  )
}