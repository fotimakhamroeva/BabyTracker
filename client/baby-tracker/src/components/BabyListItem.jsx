import React, { useState } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import "./BabyListItem.scss";

export default function BabyListItem(props) {

  const { name, image, goToNewBabyPage } = props

  let babyClass = classNames('baby-list__item', {
    "day-list__item--selected": props.selected,
  })

  if (name) {
    return(
      <div className={babyClass}>
        <h3>{name}</h3>
        <img src={image} />
      </div>
    )
  } else {
    return(
      <div className={babyClass} onClick={goToNewBabyPage}>
        <h3>Add new baby!</h3>
      </div>
    )
  }
}