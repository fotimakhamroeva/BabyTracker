import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from './Button'
import moment from 'moment';
import { DateTimePicker } from "react-tempusdominus-bootstrap";
import './NewBaby.scss'

export default function NewBaby(props) {
  console.log("NewBaby")

  let navigate = useNavigate();

  const [baby, setBaby] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    birth_location: '',
    picture_url: ''
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setBaby(prev => ({...baby, [name]: value}))
  }

  const [date, setDate] = useState(() => moment());
  const handleDateChange = (e) => {
    setDate(e.date);
 }

  const handleSubmit = () => {
    const { first_name, last_name } = baby
    if (!first_name || !last_name) {
      console.log('Empty values!')
      return
    }
    if (!date) {
      console.log('Empty date');
      return;
    }
    baby['date_of_birth'] = parseInt(date.format("X"));
    console.log("baby")
    console.log(baby)
    axios.post('http://localhost:8080/api/baby/', baby, {
      withCredentials: true,
    })
    .then((result) => { 
      console.log("addbaby")
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
          <div id="datepicker">
            <DateTimePicker defaultDate={moment()} onChange={handleDateChange} />
          </div>
       </div>
       <div class="mb-3">
          <label for="birth_location" class="form-label">Location of Birth</label>
          <input
             className="form-control" 
             type="text"
             id="birth_location" 
             name='birth_location'
             placeholder="Enter location of birth"
             value={baby.birth_location}
             onChange={handleChange}
          />
       </div>
       <div class="mb-3">
          <label for="picture_url" class="form-label">Picture URL</label>
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
  )
}