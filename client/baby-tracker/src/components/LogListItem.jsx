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
    const formattedTime = formatAMPM(new Date(log.event_datetime));
    return(
        <li key={log.id} className="list-group-item">
            <span className="log-list-item-time">{formattedTime}:</span> <span className="log-list-item-type">({log.event_type})</span> {JSON.stringify(log.event_detail)}</li>
    )
}