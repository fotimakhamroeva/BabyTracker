import React from "react";
import classNames from "classnames";

import "./Button.scss";

export default function Button(props) {
   let buttonClass = classNames('button', {
      "button--confirm": props.confirm,
      "button--confirm-secondary": props.confirmSecondary,
      "button--danger": props.danger,
   });

   let className = buttonClass;
   if (props.className) {
      className += " " + props.className;
   }

   return (
      <button 
         className={className}
         onClick={props.onClick}
         data-bs-toggle={props.toggleType} 
         data-bs-target={props.toggleTarget}>
         {props.children}
      </button>
   );
}