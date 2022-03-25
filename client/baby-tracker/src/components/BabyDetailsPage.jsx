import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import LogList from "./LogList";
import BabyInfo from "./BabyInfo";
import "./BabyDetailsPage.scss"
import Button from "./Button";


export default function BabyDetailsPage(props) {

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
            <h6>Chart here</h6>
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