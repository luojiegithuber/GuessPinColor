import React , {useEffect, useState} from 'react'
import './GameBoard.css';
import HintPanel from '../HintPanel/HintPanel';
import Groove from '../Groove/Groove';
import { Button } from 'antd';


function GameBoard(props){
    //随机确定一个结果
    let resultArr = ["white","blue","red","yellow"]

    const [stepNum, setStepNum] = useState(1);
    const [isWin, setIsWin] = useState(false);
    const [result, setResult] = useState(resultArr);
    const [myResult, setMyResult] = useState([]);

    const confirm = () => {


        if(stepNum<8){
            setStepNum(stepNum + 1);
        }

        //console.log(this.refs["panel_1"])

    };
  

    return (
        <div 
        className="chess-board" 
        >
            <div className="showChess">
                <HintPanel panelId='1' ref="panel_1" curStep={stepNum}/>
                <HintPanel panelId='2' curStep={stepNum}/>
                <HintPanel panelId='3' curStep={stepNum}/>
                <HintPanel panelId='4' curStep={stepNum}/>
                <HintPanel panelId='5' curStep={stepNum}/>
                <HintPanel panelId='6' curStep={stepNum}/>
                <HintPanel panelId='7' curStep={stepNum}/>
                <HintPanel panelId='8' curStep={stepNum}/>

                <div className="result">

                    <Groove/>
                    <Groove/>
                    <Groove/>
                    <Groove/>
                </div>

            </div>

            <div class="pieces-operate" style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                <div className="pieces">
                    <Groove color="blue" isDraggable="true"/>
                    <Groove color="red" isDraggable="true"/>
                    <Groove color="green" isDraggable="true"/>
                    <Groove color="yellow" isDraggable="true"/>
                    <Groove color="pink" isDraggable="true"/>
                    <Groove color="white" isDraggable="true"/>
                </div>
                <Button type="primary" size="large" shape="round"
                 onClick={confirm}
                >确认</Button>
                <Button type="primary" size="large" shape="round" danger>重新开始</Button>
            </div>


        </div>
      )
}

export default GameBoard;