import React, { useState } from "react";
import "./LogListItem.scss";

export default function LogListItem(props) {
    const log = props.log;
    const formatAMPM = function(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const formatFullDate = function(log) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(log.event_datetime * 1000).toLocaleDateString("en-US", options);
    }
    const measurementTypes = ["head", "height", "weight", "temperature"];
    const eventTypes = ["vaccine", "appointment", "medicine"];
    const formattedTime = formatAMPM(new Date(log.event_datetime));
    const formatDetail = function(log) {
        if (measurementTypes.includes(log.event_type)) {
            return ( <span className="fw-bold">{log.event_amount} {log.event_unit}</span> )
        } else if (eventTypes.includes(log.event_type)) {
            return ( <span><span className="fw-bold">{log.event_name}</span> - {log.event_detail}</span> )
        }
    }
    return(
        <li key={log.id} className="list-group-item">
            <span className="log-list-item-time">{formattedTime}:</span> <span className="log-list-item-type">({log.event_type})</span> {formatDetail(log)}
            <div className="log-list-item-date">{formatFullDate(log)}</div>
        </li>
    )
}