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
         <div class="modal fade" id={props.modalId} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
               <div class="modal-content">
                  <div class="modal-header">
                     <h5 class="modal-title">{props.modalTitle}</h5>
                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                     <div class="row g-3 align-items-center">
                        <div class="col-3">
                           <label for="amount" class="col-form-label">Amount</label>
                        </div>
                        <div class="col-5">
                           <input 
                              type="number" 
                              className="form-control" 
                              id="amount" 
                              name="amount"
                              // value={user.email}
                              // onChange={handleChange} 
                              />
                        </div>
                     </div>
                     <div class="row g-3 align-items-center mt-1">
                        <div class="col-3">
                           <label for="unit" class="col-form-label">Unit</label>
                        </div>
                        <div class="col-5">
                           <select id="unit" name="unit" class="form-select">
                              {unitOptions}
                           </select>
                        </div>
                     </div>
                     <div class="row g-3 align-items-center mt-1">
                        <div class="col-3">
                           <label for="datepicker" class="col-form-label">Date</label>
                        </div>
                        <div class="col-5">
                           <div id="datepicker">
                              <DatePicker date={new Date()} />
                           </div>
                        </div>
                     </div>
                     <div class="row g-3 align-items-center mt-1">
                        <div class="col-3">
                           <label for="timepicker" class="col-form-label">Time</label>
                        </div>
                        <div class="col-5">
                           <div id="timepicker">
                              <TimePicker date={new Date()} />
                           </div>
                        </div>
                     </div>
                    
                  </div>
                  <div class="modal-footer">
                     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" class="btn btn-primary">Submit</button>
                  </div>
               </div>
            </div>
         </div>
      </form>
   )
}