import React , {useEffect, useState,useRef,Popconfirm} from 'react'
//import {QuestionCircleOutlined} from '@ant-design/icons';
import './GameBoard.css';
import HintPanel from '../HintPanel/HintPanel';
import Groove from '../Groove/Groove';
import PlayerPanel from '../PlayerPanel/PlayerPanel';

import { Button, message,Tooltip } from 'antd';
import Element from 'antd/lib/skeleton/Element';


function GameBoard(props){

    //洗牌算法
    Array.prototype.shuffle = function () {
        let arr = this;
        for (let i = arr.length - 1; i >= 0; i--) {
            //取得0~i的整数
            let randomIndex = Math.floor(Math.random() * (i + 1));
            
            //得到任意index 的值
            let itemAtIndex = arr[randomIndex];
            
            //交换
            arr[randomIndex] = arr[i];
            arr[i] = itemAtIndex;
        }
        return arr;
    }

    //所有游戏结果的数组
    const allColor = ["white","blue","red","yellow","pink","green"];

    //随机确定一个结果
    const randomResult = () => {
        let result = [];

        let allresult = allColor //所有颜色数组 的 副本


        allresult.shuffle();//洗牌算法——打乱数组

        //取前面四个元素即可
        for(let i = 0 ; i < 4 ; i++){
            result.push(allresult[i])
        }

        return result;
    }

    const firstResult = randomResult();//初始答案

    const [stepNum, setStepNum] = useState(1);
    const [isWin, setIsWin] = useState(false);
    const [result, setResult] = useState(firstResult);
    const [myResult, setMyResult] = useState([]);
    const [isAllowConfirm, setIsAllowConfirm] = useState(true);
    const [resultCoverClass, setResultCoverClass] = useState("resultCover");


    const HintPanel_1 = useRef(null);
    const HintPanel_2 = useRef(null);
    const HintPanel_3 = useRef(null);
    const HintPanel_4 = useRef(null);
    const HintPanel_5 = useRef(null);
    const HintPanel_6 = useRef(null);
    const HintPanel_7 = useRef(null);
    const HintPanel_8 = useRef(null);

    //暂时用不到这个数组
    const HintPanelGroup = [
        HintPanel_1,
        HintPanel_2,
        HintPanel_3,
        HintPanel_4,
        HintPanel_5,
        HintPanel_6,
        HintPanel_7,
        HintPanel_8,
    ];

    useEffect(() => {
        //console.log("当前答案",result)
    });




    //重置游戏
    const resetGame = () => {
        
        //let newResult = randomResult();
        //console.log("新的答案",newResult)
        //setResult(newResult);

        if (window.confirm("是否确认重新开始？")) {
            window.location.replace("http://www.luojiework.cn:8019/")//刷新页面
        } else {

        }

    }

    //直接看答案
    const resetSee = () => {
    

        if (window.confirm("是否确认直接看答案？")) {
            setStepNum(9);
            setIsAllowConfirm(false);
            setResultCoverClass("resultCover-end")
        } else {

        }

    }

    //将目前的结果与最终结果对比，得到【全对】、【半对】的个数
    const compareResult = (curHintPanetResult,HintPanel_num) => {
        let fullCorrect = 0;
        let halfCorrect = 0;
        
        console.log('你的答案',curHintPanetResult);
        //console.log('标准答案',result);

        //判断【全对】【半对】
        result.map((value,index) => {
            if(value===curHintPanetResult[index]){
                fullCorrect++;
            }else if(curHintPanetResult.indexOf(value)>=0){
                halfCorrect++;
            }

        });


        HintPanel_num.current.getCorrectNum(fullCorrect,halfCorrect);//用于更新四点小面板

        if(fullCorrect===4){
            if(stepNum%2==0){
                message.success('红方获得胜利，游戏结束');
            }else{
                message.success('蓝方获得胜利，游戏结束');
            }

            setStepNum(9);
            setIsAllowConfirm(false);
            setResultCoverClass("resultCover-end")
        }
    }

    const HintPanetToResult = (HintPanel_num) => {
        //console.log('一开始',myResult)
        let temp = myResult;
        let curHintPanetResult = HintPanel_num.current.clearUpHintResult()

        //如果玩家没有填满四个格子，无法继续
        /*curHintPanetResult.forEach(element => {
            if(!element){
                console.log("请填上四颗棋子！");
                setStepNum(stepNum);
                return false;
            }
        });*/

        //forEach是异步的！
        for(let i = 0;i<curHintPanetResult.length;i++){
            if(!curHintPanetResult[i]){
                message.error('请放入四颗棋子！不要有空缺');
                setStepNum(stepNum);
                return false;
            }
        }

        setTimeout(()=>{setStepNum(stepNum + 1);},2000);

        

        temp.push(curHintPanetResult)

        setMyResult(temp);

        compareResult(curHintPanetResult,HintPanel_num);


        //console.log('接下来',myResult) //此处的更新是立刻反应出来
    }

    const HintPanetToResultByStepName = (stepNum) => {
        switch(stepNum){
            case 1:
                HintPanetToResult(HintPanel_1);
                break;
            case 2:
                HintPanetToResult(HintPanel_2);
                break;
            case 3:
                HintPanetToResult(HintPanel_3);
                break;
            case 4:
                HintPanetToResult(HintPanel_4);
                break;
            case 5:
                HintPanetToResult(HintPanel_5);
                break;
            case 6:
                HintPanetToResult(HintPanel_6);
                break;
            case 7:
                HintPanetToResult(HintPanel_7);
                break;  
            case 8:
                HintPanetToResult(HintPanel_8);
                break;         
                
        }
    }


    const confirm = () => {

        if(!isAllowConfirm)return false;

        //确定当前的结果数组,*****不知道为什么这个方法没用****
        //HintPanelGroup[stepNum].current.clearUpHintResult();
       
        if(stepNum<=8){
            
            
            HintPanetToResultByStepName(stepNum);//setState更新的异步问题，此处的stepNum没有+1
            
            if(stepNum==8){
                message.warning('操作流程终止，打成平局o(╥﹏╥)o');
                //console.log(myResult)
                setIsAllowConfirm(false);//终止操作流程
                setResultCoverClass("resultCover-end");//开启盖子动画
            }
        }


    };

    const confirmPopconfirm = () => {

    };  

    const cancelPopconfirm = () => {

    };

    const jump = () => {

        //window.location.href="https://www.3dmgame.com/gl/3811106.html";
        window.open("https://www.3dmgame.com/gl/3811106.html")
    };

    return (
        <div 
        className="chess-board" 
        >

            <div className="player-panel">
                <PlayerPanel group="蓝方" name="帅气的蓝方" />
                <div className="game-timer">∞</div>
                <PlayerPanel group="红方" name="可爱的红方" />
            </div>

            <hr style={{width:"800px",backgroundColor:"black"}}/>

            <div className="showChess">
                <HintPanel panelId='1' curStep={stepNum} ref={HintPanel_1}/>
                <HintPanel panelId='2' curStep={stepNum} ref={HintPanel_2}/>
                <HintPanel panelId='3' curStep={stepNum} ref={HintPanel_3}/>
                <HintPanel panelId='4' curStep={stepNum} ref={HintPanel_4}/>
                <HintPanel panelId='5' curStep={stepNum} ref={HintPanel_5}/>
                <HintPanel panelId='6' curStep={stepNum} ref={HintPanel_6}/>
                <HintPanel panelId='7' curStep={stepNum} ref={HintPanel_7}/>
                <HintPanel panelId='8' curStep={stepNum} ref={HintPanel_8}/>

                
                <div className="result">
                    <div className={resultCoverClass}>
                        <p>答</p>
                        <p>案</p>
                        <p>盖</p>
                        <p>子</p>
                    </div>
                    <Groove color={result[0]} isResult="true"/>
                    <Groove color={result[1]} isResult="true"/>
                    <Groove color={result[2]} isResult="true"/>
                    <Groove color={result[3]} isResult="true"/>
                </div>

            </div>

            <div class="pieces-operate" style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>

                <Button type="primary" size="large" shape="round" onClick={confirm}>确认</Button>

                <div className="pieces">
                    <Groove color="blue" isDraggable="true"/>
                    <Groove color="red" isDraggable="true"/>
                    <Groove color="green" isDraggable="true"/>
                    <Groove color="yellow" isDraggable="true"/>
                    <Groove color="pink" isDraggable="true"/>
                    <Groove color="white" isDraggable="true"/>
                </div>


                <Tooltip title="重新开始">
                    <Button type="primary" size="middle" shape="circle" onClick={resetGame} danger>Re</Button>
                </Tooltip>
                <Tooltip title="直接查看答案，结束游戏">
                <Button type="primary" size="middle" shape="circle" style={{backgroundColor:"#FFA500",borderColor:"#FFA500"}} onClick={resetSee} danger>End</Button>
                </Tooltip>
                <Tooltip title="教程">
                    <Button type="primary" size="middle" shape="circle" style={{color:"#000",backgroundColor:"#fff",borderColor:"#fff",paddingLeft:"5px"}}  onClick={jump}  >
                        <a src="https://www.3dmgame.com/gl/3811106.html">？</a>
                    </Button>
                </Tooltip>
               
            </div>
            

        </div>
      )
}

export default GameBoard;