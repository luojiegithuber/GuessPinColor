import React from 'react'
import './Groove.css';

function Groove(){
    return (
        <div 
        className="groove" 
        onClick={props.onClick}>
          {props.value}
        </div>
      )
}

export default Groove;