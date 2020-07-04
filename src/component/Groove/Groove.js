import React , {useEffect, useState, useImperativeHandle} from 'react'
import './Groove.css';
import ReactDOM from 'react-dom';

function Groove(props){
    const [color, setColor] = useState("white");
    const [colorCode, setColorCode] = useState("#000");
    
    useEffect(() => {
      setColor(props.color)
    });

    
    const domdrugstart = (color,ev) => {
      ev.dataTransfer.setData("color", color.color);

    };

    const dragenter = (ev) => {
      ev.target.style.border = '2px solid #008dff';
    };

    const dragleave = (ev) => {
      ev.target.style.border = '';
    };

    const drop = (ev) => {
      ev.preventDefault();
      ev.target.style.border = '';
      let curColor = ev.dataTransfer.getData("color");
      console.log(curColor.toString())
      ev.target.style.backgroundColor = curColor;
    };

    const allowDrop = (ev) => {
      ev.preventDefault();
    };





    return (
      props.isDraggable?
        <div 
        id={props.id}
        className="groove" 
        onClick={props.onClick}
        draggable="true"
        onDragStart={domdrugstart.bind(this, {color})}
        //onDrag={draging.bind(this)}
        style={{backgroundColor:color}}
        />
        :
        props.isCurStep?
        <div 
        className="groove" 
        onClick={props.onClick}
        onDragEnter={dragenter.bind(this)}
        onDragLeave={dragleave.bind(this)}
        onDrop={drop.bind(this)}
        onDragOver={allowDrop.bind(this)}
        />
        :
        <div 
        className="groove" 
        />

      )

}

export default Groove;