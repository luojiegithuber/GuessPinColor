import React , {useEffect, useState, useImperativeHandle} from 'react'
import './Groove.css';
import ReactDOM from 'react-dom';

function Groove(props,ref){
    const [color, setColor] = useState("white");
    const [colorCode, setColorCode] = useState("#000");
    //const [flagOne, setFlagOne] = useState(true);
  

    useImperativeHandle(ref, () => ({
      getColor:() => color,
    }));


    useEffect(() => {
        setColor(props.color);
    },[]);

    
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
      ev.target.style.backgroundColor = curColor;
      setColor(curColor.toString());
    };

    const allowDrop = (ev) => {
      ev.preventDefault();
    };


    return (
      props.isDraggable?
        <div 
        ref={ref}
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
        ref={ref} 
        className="groove" 
        onClick={props.onClick}
        onDragEnter={dragenter.bind(this)}
        onDragLeave={dragleave.bind(this)}
        onDrop={drop.bind(this)}
        onDragOver={allowDrop.bind(this)}
        style={{backgroundColor:color}}
        />
        :
        <div 
        ref={ref}
        className="groove" 
        onClick={props.onClick}
        style={{backgroundColor:color}}
        />

      );

}

Groove = React.forwardRef(Groove);
export default Groove;