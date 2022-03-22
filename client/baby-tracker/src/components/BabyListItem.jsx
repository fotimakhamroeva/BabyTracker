import React, { useState } from "react";
import classNames from "classnames";

export default function BabyListItem(props) {

  const { name, image } = props

  let babyClass = classNames('baby-list__item', {
    "day-list__item--selected": props.selected,
  })

  if (name && image) {
    return(
      <div className={babyClass}>
        <h3>{name}</h3>
        <h3>{image}</h3>
      </div>
    )
  } else {
    return(
      <h3>Add new baby!</h3>
    )
  }
}