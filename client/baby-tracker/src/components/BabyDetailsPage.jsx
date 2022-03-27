import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import LogList from "./LogList";
import BabyInfo from "./BabyInfo";
import "./BabyDetailsPage.scss"
import Button from "./Button";
import LogMeasurementModal from "./LogMeasurementModal";
import LogEventModal from "./LogEventModal";
import Graph from "./Graph"

export default function BabyDetailsPage(props) {

  const LogTypes = {
    HEAD: "head",
    HEIGHT: "height",
    WEIGHT: "weight",
    TEMPERATURE: "temperature",
    MEDICINE: "medicine",
    VACCINE: "vaccine",
    APPOINTMENT: "appointment"
  }
  const lengthUnits = [
    {name: "Centimeter", value: "cm"}, 
    {name: "Millimeter", value: "mm"},
    {name: "Inch", value: "in"},
    {name: "Foot", value: "ft"}
  ]
  const temperatureUnits = [
    {name: "Celcius", value: "C"}, 
    {name: "Farenheit", value: "F"}
  ]
  const weightUnits = [
    {name: "kilogram", value: "kg"},
    {name: "gram", value: "g"}, 
    {name: "milligram", value: "mg"},
    {name: "ounce", value: "oz"},
    {name: "pound", value: "lb"}
  ]

  const [babyDetails, setBabyDetails] = useState({})
  const [refreshState, setRefreshState] = useState(0)
  const [logsBabyHistory, setBabyLogsHistory] = useState([])

  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8080/api/baby/${id}`, {
      withCredentials: true,
    })
    .then((result) => {
      setBabyDetails(result.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/log`, {
      params: { baby_id: id },
      withCredentials: true,
    })
    .then((result) => {
      const allLogs = result.data
      setBabyLogsHistory(allLogs)
    })
  }, [refreshState])

  const getHeightLogs = (logs) => {
    let heightLogs = []
    for (let log of logs) {
      if (log.event_type === LogTypes.HEIGHT) {
        heightLogs.push(log)
      }
    }
    return heightLogs
  }

  const getWeightLogs = (logs) => {
    let weightLogs = []
    for (let log of logs) {
      if (log.event_type === LogTypes.WEIGHT) {
        weightLogs.push(log)
      }
    }
    return weightLogs
  }

  const getHeadLogs = (logs) => {
    let headLogs = []
    for (let log of logs) {
      if (log.event_type === LogTypes.HEAD) {
        headLogs.push(log)
      }
    }
    return headLogs
  }

  const onLogComplete = () => {
    console.log("onLogComplete");
    const newState = refreshState+1;
    setRefreshState(newState);
  }

  return(
    <div className="row align-items-start">
      <section className="col">
        <BabyInfo babyName={babyDetails.first_name + " " + babyDetails.last_name} dateOfBirth={babyDetails.date_of_birth} birthLocation={babyDetails.birth_location} babyPic={babyDetails.picture_url} />
        <div className="detailBabyInfoSpace" />
        <section className="section">
          <h4 className="mb-3">Health</h4>
          <div className="row">
            <div class="col d-flex justify-content-start">
              <Button confirm children="Temperature" className="log-button" toggleType="modal" toggleTarget="#modalTemperature"/>
              <Button confirm children="Appointment" className="log-button" toggleType="modal" toggleTarget="#modalAppointment" />
            </div>
          </div>
          <div className="row mt-2">
            <div class="col d-flex justify-content-start">
              <Button confirm children="Vaccine" className="log-button" toggleType="modal" toggleTarget="#modalVaccine" />
              <Button confirm children="Medication" className="log-button" toggleType="modal" toggleTarget="#modalMedicine" />
            </div>
          </div>
          <h4 className="mt-4 mb-3">Growth</h4>
          <div className="row">
            <div class="col d-flex justify-content-start">
              <Button confirmSecondary children="Head Size" className="log-button" toggleType="modal" toggleTarget="#modalHead" />
              <Button confirmSecondary children="Height" className="log-button" toggleType="modal" toggleTarget="#modalHeight" />
              <Button confirmSecondary children="Weight" className="log-button" toggleType="modal" toggleTarget="#modalWeight" />
            </div>
          </div>
          <div className="row">
            <div className="mt-4">
              <Graph logs={getHeightLogs(logsBabyHistory)} measurement='Height'/>
            </div>
            <div className="mt-4">
              <Graph logs={getWeightLogs(logsBabyHistory)} measurement='Weight'/>
            </div>
            <div className="mt-4">
              <Graph logs={getHeadLogs(logsBabyHistory)} measurement='Head'/>
            </div>
          </div>
        </section>
        <div className="detailBabyInfoSpace" />
      </section>
      <section className="col">
        <LogList babyId={id} refreshState={refreshState} />
      </section>

      <LogMeasurementModal 
        modalId="modalTemperature" 
        modalTitle="Log Temperature"
        unitOptions={temperatureUnits}
        measurementType={LogTypes.TEMPERATURE} 
        onComplete={onLogComplete}
        babyId={id} />

      <LogMeasurementModal 
        modalId="modalHead" 
        modalTitle="Log Head Size"
        unitOptions={lengthUnits}
        measurementType={LogTypes.HEAD} 
        onComplete={onLogComplete}
        babyId={id} />

      <LogMeasurementModal 
        modalId="modalWeight" 
        modalTitle="Log Weight"
        unitOptions={weightUnits}
        measurementType={LogTypes.WEIGHT} 
        onComplete={onLogComplete}
        babyId={id} />

      <LogMeasurementModal 
        modalId="modalHeight" 
        modalTitle="Log Height"
        unitOptions={lengthUnits}
        measurementType={LogTypes.HEIGHT} 
        onComplete={onLogComplete}
        babyId={id} />

      <LogEventModal 
        modalId="modalMedicine" 
        modalTitle="Log Medication"
        titlePlaceholder="Ex. Baby Tylenol"
        detailPlaceholder="Ex. 5mg"
        eventType={LogTypes.MEDICINE} 
        onComplete={onLogComplete}
        babyId={id} />

      <LogEventModal 
        modalId="modalVaccine" 
        modalTitle="Log Vaccine"
        titlePlaceholder="Ex. 6 month vaccine"
        detailPlaceholder="Ex. Diphtheria, tetanus"
        eventType={LogTypes.VACCINE}
        onComplete={onLogComplete}
        babyId={id} />

      <LogEventModal 
        modalId="modalAppointment" 
        modalTitle="Log Appointment"
        titlePlaceholder="Ex. 4 month checkup"
        detailPlaceholder="Ex. Dr John at Cambridge clinic"
        eventType={LogTypes.APPOINTMENT} 
        onComplete={onLogComplete}
        babyId={id} />

    </div>
  )
}