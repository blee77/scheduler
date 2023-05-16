import React from "react";
import classNames from "classnames";
import "components/Button.scss";


export default function Button(props) {


   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger,
    });


   // let buttonClass = classNames("button",{
   //    if (props.confirm) {
   //       buttonClass += " button--confirm";
   //     } 
       
   //     if (props.danger){
   //      buttonClass += " button--danger";
   //     } 
      
   }

  
  


   return (<button   
      onClick={props.onClick}
      disabled={props.disabled}
      className={buttonClass}>{props.children}</button> 
   )

}
