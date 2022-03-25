import React, { useState } from "react";
import "./BabyInfo.scss";

export default function BabyInfo(props) {
    return(
        <section className="baby-section section">
             <div className="row align-items-start">
                <div className="babyPic">
                    <img className="babyPicImage" src={ props.babyPic } alt="Avatar" />
                </div>
                <div className="col">
                    <span>{ props.babyName }</span><br/>
                    <span>Born on { props.dateOfBirth }</span><br/>
                    <span>at { props.birthLocation }</span>
                </div>
            </div>
        </section>
    )
}