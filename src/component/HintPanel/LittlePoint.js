import React from 'react'
import './LittlePoint.css';

function LittlePoint(props){
    return (
        <div 
        className="little-point" 
        style={{backgroundColor:(props.type=="isFullCorrect"?"#FF4500":(props.type=="isHalfCorrect"?"white":"black"))}}
        >
          {props.value}
        </div>
      )
}

export default LittlePoint;