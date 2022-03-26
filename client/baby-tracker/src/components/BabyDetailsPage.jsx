import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import LogList from "./LogList";
import BabyInfo from "./BabyInfo";
import "./BabyDetailsPage.scss"
import Button from "./Button";
import Graph from "./Graph"


export default function BabyDetailsPage(props) {

  const [babyDetails, setBabyDetails] = useState({})

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
    axios.get(`http://localhost:8080/api/log/`, {
      withCredentials: true,
    })
    .then((result) => {
      const allLogs = result.data
      const specificBabyLogs = []
      for (let log of allLogs) {
        if (log.baby_id == Number(id)) {
          specificBabyLogs.push(log)
        }
      }
      setBabyLogsHistory(specificBabyLogs)
    })
  }, [])

  const getHeightLogs = (logs) => {
    let heightLogs = []
    for (let log of logs) {
      if (log.event_type === 'height') {
        heightLogs.push(log)
      }
    }
    return heightLogs
  }

  const getWeightLogs = (logs) => {
    let weightLogs = []
    for (let log of logs) {
      if (log.event_type === 'weight') {
        weightLogs.push(log)
      }
    }
    return weightLogs
  }

  const getHeadLogs = (logs) => {
    let headLogs = []
    for (let log of logs) {
      if (log.event_type === 'head') {
        headLogs.push(log)
      }
    }
    return headLogs
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
              <Button confirm children="Log Temperature" />
              <Button confirm children="Log Temperature" />
            </div>
          </div>
          <div className="row">
            <div class="col d-flex justify-content-start">
              <Button confirm children="Log Temperature" />
              <Button confirm children="Log Temperature" />
            </div>
          </div>
          <h4 className="mt-4 mb-3">Growth</h4>
          <div className="row">
            <div class="col d-flex justify-content-start">
              <Button confirm children="Log Temperature" />
              <Button confirm children="Log Temperature" />
              <Button confirm children="Log Temperature" />
            </div>
          </div>
          <h4 className="mt-4 mb-3">Charts</h4>
          <div className="row">
            <Graph logs={getHeightLogs(logsBabyHistory)} measurement='Height'/>
            <Graph logs={getWeightLogs(logsBabyHistory)} measurement='Weight'/>
            <Graph logs={getHeadLogs(logsBabyHistory)} measurement='Head'/>
          </div>
        </section>
        <div className="detailBabyInfoSpace" />
      </section>
      <section className="col">
        <LogList />
      </section>
    </div>
  )
}