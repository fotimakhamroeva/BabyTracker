import React, { useState, useContext } from "react";
import axios from 'axios'
import { UserContext } from '../context/userContext'
import './LogMeasurementModal.scss'
import moment from 'moment';
import $ from 'jquery';
import {
   DatePicker,
   TimePicker,
 } from "react-tempusdominus-bootstrap";
 
export default function LogMeasurementModal(props) {
   
   /* 
   {
      "event_type": "head",
      "event_datetime": 1647676171,
      "event_amount": 35, // circumference
      "event_unit": "cm"
   }
   */
   const [log, setLog] = useState({
      event_type: props.measurementType,
      event_amount: '',
      event_unit: props.unitOptions[0].value,
      event_datetime: ''
   })

   const [date, setDate] = useState(() => moment());
   const [time, setTime] = useState(() => moment());

   const handleChange = (e) => {
      console.log(e.target.name + " => " + e.target.value);
      const name = e.target.name
      const value = e.target.value
      setLog(prev => ({...log, [name]: value}))
   }

   const handleDateChange = (e) => {
      setDate(e.date);
   }

   const handleTimeChange = (e) => {
      setTime(e.date);
   }

   const handleSubmit = () => {
      const { event_amount, event_unit } = log;
      if (!event_amount || !event_unit) {
         console.log('Empty values!');
         return;
      }
      if (!date || !time) {
         console.log('Empty time or date');
         return;
      }
      const dateTimeStr = date.format("YYYY-MM-DD") + "T" + time.format("HH:mm:ssZ");
      const dateTime = moment(dateTimeStr);
      log['event_datetime'] = parseInt(dateTime.format("X"));
      axios.post(`http://localhost:8080/api/log/${props.babyId}/measurement`, log, {
         withCredentials: true,
      })
      .then((result) => { 
         $("#close" + props.modalId).click();
         console.log(result.data)
         props.onComplete();
      })
      .catch((error) => {
         $("#close" + props.modalId).click();
         console.log(error)
         props.onComplete();
      })
   }

   const unitOptions = props.unitOptions.map( option => 
      <option value={option.value}>{option.name}</option>
   )
   return(
      <form onSubmit={(e) => e.preventDefault()}>
         <div className="modal fade" id={props.modalId} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title">{props.modalTitle}</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <div className="row g-3 align-items-center">
                        <div className="col-3">
                           <label for="event_amount" className="col-form-label">Amount</label>
                        </div>
                        <div className="col-5">
                           <input 
                              type="number" 
                              className="form-control" 
                              id="event_amount" 
                              name="event_amount"
                              placeholder="Ex. 56"
                              value={log.event_amount}
                              onChange={handleChange} 
                              />
                        </div>
                     </div>
                     <div className="row g-3 align-items-center mt-1">
                        <div className="col-3">
                           <label for="event_unit" className="col-form-label">Unit</label>
                        </div>
                        <div className="col-5">
                           <select id="event_unit" name="event_unit" className="form-select" disabled onChange={handleChange} >
                              {unitOptions}
                           </select>
                        </div>
                     </div>
                     <div className="row g-3 align-items-center mt-1">
                        <div className="col-3">
                           <label for="datepicker" className="col-form-label">Date</label>
                        </div>
                        <div className="col-5">
                           <div id="datepicker">
                              <DatePicker defaultDate={moment()} onChange={handleDateChange} />
                           </div>
                        </div>
                     </div>
                     <div className="row g-3 align-items-center mt-1">
                        <div className="col-3">
                           <label for="timepicker" className="col-form-label">Time</label>
                        </div>
                        <div className="col-5">
                           <div id="timepicker">
                              <TimePicker defaultDate={moment()} onChange={handleTimeChange} />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="modal-footer">
                     <button id={"close" + props.modalId} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                  </div>
               </div>
            </div>
         </div>
      </form>
   )
}