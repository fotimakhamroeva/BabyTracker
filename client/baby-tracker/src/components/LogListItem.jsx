import React, { useState } from "react";
import "./LogListItem.scss";
import moment from 'moment';

export default function LogListItem(props) {
    const log = props.log;
    const formatAMPM = function() {
        return moment.unix(log.event_datetime).format("h:mm A");
    }
    const formatFullDate = function() {
        return moment.unix(log.event_datetime).format("dddd, MMMM Do YYYY");
    }
    const measurementTypes = ["head", "height", "weight", "temperature"];
    const eventTypes = ["vaccine", "appointment", "medicine"];
    const formattedTime = formatAMPM(moment(log.event_datetime));
    const formatDetail = function(log) {
        if (measurementTypes.includes(log.event_type)) {
            return ( <span className="fw-bold">{log.event_amount} {log.event_unit}</span> )
        } else if (eventTypes.includes(log.event_type)) {
            return ( 
                <span>
                    <span className="fw-bold">{log.event_name}</span>
                    { (log.event_detail) ?  " - " + log.event_detail : "" }
                </span> 
            )
        }
    }
    return(
        <li key={log.id} className="list-group-item">
            <span className="log-list-item-time">{formattedTime}:</span> <span className="log-list-item-type">({log.event_type})</span> {formatDetail(log)}
            <div className="log-list-item-date">{formatFullDate(log)}</div>
        </li>
    )
}