import React from 'react'
import './LittlePoint.css';

function LittlePoint(props){
    return (
        <div 
        className={props.type=="isFullCorrect"?"little-point-full":(props.type=="isHalfCorrect"?"little-point-half":"little-point")}
        /*style={{backgroundColor:(props.type=="isFullCorrect"?"#FF4500":(props.type=="isHalfCorrect"?"white":"black"))}}*/
        >
          {props.value}
        </div>
      )
}

export default LittlePoint;