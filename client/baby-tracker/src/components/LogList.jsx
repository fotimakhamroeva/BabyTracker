import React, { useState } from "react";
import "./LogList.scss";
import LogCalendar from './LogCalendar'
import LogListItem from "./LogListItem";
import axios from 'axios'


export default function LogList(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedLog, setSelectedLog] = useState([]);
    const logListItems = selectedLog.map(log => 
        <LogListItem log={log} />
    )
    React.useEffect(() => {
        // Sun May 01 2022 00:00:00 GMT-0400 as Date
        axios.get('http://localhost:8080/api/log?date_filter=' + selectedDate, {
           withCredentials: true,
        })
        .then((result) => { 
           setSelectedLog(result.data);
        })
        .catch((error) => {
            setSelectedLog([]);
            //console.log(error)
        })
      }, [selectedDate]);
    return(
        <section className="log-list-section">
            <LogCalendar 
                onChoosenDate={setSelectedDate} 
                choosenDate={selectedDate} />
            <h3 className="log-list-heading my-3">Log History ({monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()})</h3>
            <ul className="list-group">
            { (logListItems.length > 0) 
            ? 
                logListItems
            : 
                <li className="list-group-item log-list-empty">No logs found for {monthNames[selectedDate.getMonth()]}</li>
            }
            </ul> 
        </section>
    )
}