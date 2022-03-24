import React, { useState } from "react";
import "./LogList.scss";
import LogCalendar from './LogCalendar'
import axios from 'axios'


export default function LogList(props) {
    const updateSelectedMonth = (value) => {
        // Sun May 01 2022 00:00:00 GMT-0400 as Date
        setSelectedMonth(value);
        axios.get('http://localhost:8080/api/log', {
            withCredentials: true,
         })
         .then((result) => { 
            console.log(result.data);
            setSelectedLogData(result.data);
         })
         .catch((error) => {
            console.log(error)
         })
    }
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedLogData, setSelectedLogData] = useState([]);
    const logDataItems = selectedLogData.map(log => 
        <h4 key={log.id}>{log.event_datetime}: ({log.event_type}) {JSON.stringify(log.event_detail)}</h4>
    )
    return(
        <div>
            <LogCalendar 
                onChoosenDate={updateSelectedMonth} 
                choosenDate={selectedMonth} />
            <h2>{selectedMonth.toString()}</h2>
            <ul>
                {logDataItems}
            </ul>
        </div>
    )
}