import React from 'react'
import './PlayerPanel.css';

function PlayerPanel(props){
    return (
        props.group == "蓝方"?
        <div 
        className="blue-panel" 
        >
          <div className="portrait" style={{backgroundImage:"url("+require("./蓝方头像.jpg")+")"}}></div>  
          {props.name}
        </div>
        :
        <div 
        className="red-panel" 
        >
          
          {props.name}
          <div className="portrait" style={{backgroundImage:"url("+require("./红方头像.jpg")+")"}}></div>  
        </div>
      )
}

export default PlayerPanel;