import React from 'react'
import './LittlePoint.css';

function LittlePoint(props){
    return (
        <div 
        className="little-point" 
        >
          {props.value}
        </div>
      )
}

export default LittlePoint;