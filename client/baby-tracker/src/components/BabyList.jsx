import React from "react";
import BabyListItem from './BabyListItem'

export default function BabyList(props) {
  const babyListItems = props.babies.map(baby => 
  <BabyListItem
    name={baby.name}
    image={baby.image}
  />)

  return(
    <ul>
      {babyListItems}
      <BabyListItem />
    </ul>
  )
}