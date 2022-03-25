import React, { useState } from "react";
import "./LogCalendar.scss";
import Calendar from 'react-calendar'
import "react-calendar/dist/Calendar.css";

export default function LogCalendar(props) {
    return(
        <div>
            <Calendar 
                maxDetail='year'
                onChange={props.onChoosenDate} 
                value={props.choosenDate} />
        </div>
    )
}