import React, { useState, useContext } from "react";
import axios from 'axios'
import { UserContext } from '../context/userContext'
import './LogEventModal.scss'
import moment from 'moment';
import $ from 'jquery';
import {
   DatePicker,
   TimePicker,
 } from "react-tempusdominus-bootstrap";
 
export default function LogEventModal(props) {

   /* 
   {
    "event_type": "medicine",
    "event_datetime": 1647676171,
    "event_name": "Tylenol Syrup",
    "event_detail": "5 mg"
   }
   */
   const [log, setLog] = useState({
      event_type: props.eventType,
      event_name: '',
      event_detail: '',
      event_datetime: ''
   })

   const [date, setDate] = useState(() => moment());
   const [time, setTime] = useState(() => moment());

   const handleChange = (e) => {
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
      const { event_name } = log;
      if (!event_name) {
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
      axios.post(`http://localhost:8080/api/log/${props.babyId}/event`, log, {
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
                           <label for="event_name" className="col-form-label">Title</label>
                        </div>
                        <div className="col-5">
                           <input 
                              type="text" 
                              className="form-control" 
                              id="event_name" 
                              name="event_name"
                              placeholder={props.titlePlaceholder}
                              value={log.event_name}
                              onChange={handleChange} 
                              />
                        </div>
                     </div>
                     <div className="row g-3 align-items-center mt-1">
                        <div className="col-3">
                           <label for="event_detail" className="col-form-label">Detail</label>
                        </div>
                        <div className="col-5">
                           <input 
                              type="text" 
                              className="form-control" 
                              id="event_detail" 
                              name="event_detail"
                              placeholder={props.detailPlaceholder}
                              value={log.event_detail}
                              onChange={handleChange} 
                              />
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