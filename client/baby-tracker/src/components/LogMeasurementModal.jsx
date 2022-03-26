import React, { useState, useContext } from "react";
import axios from 'axios'
import { UserContext } from '../context/userContext'
import './LogMeasurementModal.scss'
import {
   DatePicker,
   TimePicker,
 } from "react-tempusdominus-bootstrap";
 
export default function LogMeasurementModal(props) {

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
                           <label for="amount" className="col-form-label">Amount</label>
                        </div>
                        <div className="col-5">
                           <input 
                              type="number" 
                              className="form-control" 
                              id="amount" 
                              name="amount"
                              placeholder="Ex. 56"
                              // value={user.email}
                              // onChange={handleChange} 
                              />
                        </div>
                     </div>
                     <div className="row g-3 align-items-center mt-1">
                        <div className="col-3">
                           <label for="unit" className="col-form-label">Unit</label>
                        </div>
                        <div className="col-5">
                           <select id="unit" name="unit" className="form-select">
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
                              <DatePicker date={new Date()} />
                           </div>
                        </div>
                     </div>
                     <div className="row g-3 align-items-center mt-1">
                        <div className="col-3">
                           <label for="timepicker" className="col-form-label">Time</label>
                        </div>
                        <div className="col-5">
                           <div id="timepicker">
                              <TimePicker date={new Date()} />
                           </div>
                        </div>
                     </div>
                    
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" className="btn btn-primary">Submit</button>
                  </div>
               </div>
            </div>
         </div>
      </form>
   )
}