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
    {name: "gram", value: "g"}, 
    {name: "milligram", value: "mg"},
    {name: "kilogram", value: "kg"},
    {name: "ounce", value: "oz"},
    {name: "pound", value: "lb"}
  ]

  const [babyDetails, setBabyDetails] = useState({})

  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8080/api/baby/${id}`, {
      withCredentials: true,
    })
    .then((result) => {
      setBabyDetails(result.data)
    })
  }, [])

  return(
    <div className="row align-items-start">
      <section className="col">
        <BabyInfo babyName={babyDetails.first_name + " " + babyDetails.last_name} dateOfBirth={babyDetails.date_of_birth} birthLocation={babyDetails.birth_location} babyPic={babyDetails.picture_url} />
        <div className="detailBabyInfoSpace" />
        <section className="section">
          <h4 className="mb-3">Log {babyDetails.first_name}'s health</h4>
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
          <h4 className="mt-4 mb-3">Log {babyDetails.first_name}'s growth</h4>
          <div className="row">
            <div class="col d-flex justify-content-start">
              <Button confirmSecondary children="Head Size" className="log-button" toggleType="modal" toggleTarget="#modalHead" />
              <Button confirmSecondary children="Height" className="log-button" toggleType="modal" toggleTarget="#modalHeight" />
              <Button confirmSecondary children="Weight" className="log-button" toggleType="modal" toggleTarget="#modalWeight" />
            </div>
          </div>
          <h4 className="mt-4 mb-3">Charts</h4>
          <div className="row">
            <h6>Chart here</h6>
          </div>
        </section>
        <div className="detailBabyInfoSpace" />
      </section>
      <section className="col">
        <LogList babyId={id} />
      </section>

      <LogMeasurementModal 
        modalId="modalTemperature" 
        modalTitle="Log Temperature"
        unitOptions={temperatureUnits}
        measurementType={LogTypes.TEMPERATURE} />

      <LogMeasurementModal 
        modalId="modalHead" 
        modalTitle="Log Head Size"
        unitOptions={lengthUnits}
        measurementType={LogTypes.HEAD} />

      <LogMeasurementModal 
        modalId="modalWeight" 
        modalTitle="Log Weight"
        unitOptions={weightUnits}
        measurementType={LogTypes.WEIGHT} />

      <LogMeasurementModal 
        modalId="modalHeight" 
        modalTitle="Log Height"
        unitOptions={lengthUnits}
        measurementType={LogTypes.HEIGHT} />

      <LogEventModal 
        modalId="modalMedicine" 
        modalTitle="Log Medication"
        titlePlaceholder="Ex. Baby Tylenol"
        detailPlaceholder="Ex. 5mg"
        eventType={LogTypes.MEDICINE} />

      <LogEventModal 
        modalId="modalVaccine" 
        modalTitle="Log Vaccine"
        titlePlaceholder="Ex. 6 month vaccine"
        detailPlaceholder="Ex. Diphtheria, tetanus"
        eventType={LogTypes.VACCINE} />

      <LogEventModal 
        modalId="modalAppointment" 
        modalTitle="Log Appointment"
        titlePlaceholder="Ex. 4 month checkup"
        detailPlaceholder="Ex. Dr John at Cambridge clinic"
        eventType={LogTypes.APPOINTMENT} />

    </div>
  )
}