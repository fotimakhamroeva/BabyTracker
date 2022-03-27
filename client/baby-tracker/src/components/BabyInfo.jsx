import React, { useState } from "react";
import "./BabyInfo.scss";
import moment from 'moment';

export default function BabyInfo(props) {
    const formatFullDate = function() {
        return moment.unix(props.dateOfBirth).format("MMMM Do YYYY");
    }
    return(
        <section className="baby-section section">
            <div className="row align-items-start">
                <div className="babyinfo-thumb rounded-circle">
                    { (props.babyPic) 
                    ? <img src={props.babyPic} className="babyinfo-srcImage rounded-circle" alt="Avatar" />
                    : <img src="/baby.png" className="babyinfo-srcImage rounded-circle" alt="Avatar" />
                    }
                </div>
                <div className="col">
                    <h4 className="mt-2">{ props.babyName }</h4>
                    <div className="mt-4">
                        <h5>Date of birth: { formatFullDate() }</h5>
                        <h5>Birth location: { props.birthLocation }</h5>
                    </div>
                </div>
            </div>
        </section>
    )
}