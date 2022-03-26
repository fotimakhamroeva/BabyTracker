import React, { useState, useContext } from "react";
import axios from 'axios'
import { UserContext } from '../context/userContext'
import './LogEventModal.scss'
import {
   DatePicker,
   TimePicker,
 } from "react-tempusdominus-bootstrap";
 
export default function LogEventModal(props) {

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
                           <label for="title" class="col-form-label">Title</label>
                        </div>
                        <div class="col-5">
                           <input 
                              type="text" 
                              className="form-control" 
                              id="title" 
                              name="title"
                              placeholder={props.titlePlaceholder}
                              // value={user.email}
                              // onChange={handleChange} 
                              />
                        </div>
                     </div>
                     <div class="row g-3 align-items-center mt-1">
                        <div class="col-3">
                           <label for="detail" class="col-form-label">Detail</label>
                        </div>
                        <div class="col-5">
                           <input 
                              type="text" 
                              className="form-control" 
                              id="detail" 
                              name="detail"
                              placeholder={props.detailPlaceholder}
                              // value={user.email}
                              // onChange={handleChange} 
                              />
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