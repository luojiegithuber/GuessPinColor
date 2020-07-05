import React , {useEffect, useState, useImperativeHandle} from 'react'
import './Groove.css';
import ReactDOM from 'react-dom';

function Groove(props,ref){
    const [color, setColor] = useState("");
    const [colorCode, setColorCode] = useState("#000");
    //const [flagOne, setFlagOne] = useState(true);
  

    String.prototype.colorRgb = function () {
      // 16进制颜色值的正则
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 把颜色值变成小写
      var color = this.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
          var colorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgba(" + colorChange.join(",") + "0.5 )";
      } else {
        return color;
      }
    };


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
      //ev.target.style.boxShadow = "0px 0px 2px 2px "+ curColor.colorRgb();
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
        props.isResult?
        <div 
        ref={ref}
        className="groove" 
        onClick={props.onClick}
        style={{backgroundColor:props.color}}
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