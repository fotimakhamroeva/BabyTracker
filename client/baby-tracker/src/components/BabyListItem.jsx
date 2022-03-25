import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import "./BabyListItem.scss";

export default function BabyListItem(props) {

  const { name, image, goToNewBabyPage, handleClickOnBaby } = props

  // let babyClass = classNames('baby-list__item', {
  // })

  if (name) {
    return(
      <div className="baby-list__item rounded-circle" onClick={handleClickOnBaby}>
        { (image) 
          ? <img src={image} className="baby-list__item-srcImage rounded-circle" alt="Avatar" /> 
          : <img src="/baby.png" className="baby-list__item-defaultImage" alt="Avatar" />
        }
        <div className="baby-list__item-text-container rounded-circle">
          <div className="baby-list__item-text">{name}</div>
        </div>
      </div>
    )
  } else {
    return(
      <div className="baby-list__item rounded-circle" onClick={goToNewBabyPage}>
        <img src="/baby-new.png" className="baby-list__item-defaultImage" alt="Avatar" />
        <div className="baby-list__item-text-container rounded-circle">
          <h4 className="baby-list__item-text">New Baby?</h4>
        </div>
      </div>
    )
  }
}