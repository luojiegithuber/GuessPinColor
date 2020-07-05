import React , {useEffect, useState,useRef} from 'react'
import './GameBoard.css';
import HintPanel from '../HintPanel/HintPanel';
import Groove from '../Groove/Groove';
import { Button } from 'antd';
import Element from 'antd/lib/skeleton/Element';


function GameBoard(props){


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
        
    });




    //重置游戏
    const resetGame = () => {
        
        let newResult = randomResult();
        console.log("新的答案",newResult)
        setResult(newResult);
    }

    //将目前的结果与最终结果对比，得到【全对】、【半对】的个数
    const compareResult = (curHintPanetResult,HintPanel_num) => {
        let fullCorrect = 0;
        let halfCorrect = 0;
        
        console.log('你的答案',curHintPanetResult);
        console.log('标准答案',result);

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
            console.log("你胜利了，游戏结束");
            setStepNum(9);
            setIsAllowConfirm(false);
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
                console.log("请填上四颗棋子！");
                setStepNum(stepNum);
                return false;
            }
        }

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
            setStepNum(stepNum + 1);
            HintPanetToResultByStepName(stepNum);//setState更新的异步问题，此处的stepNum没有+1
            
            if(stepNum==8){
                console.log("玩家操作结束")
                console.log(myResult)
                setIsAllowConfirm(false);//终止操作流程
            }
        }


    };
  

    return (
        <div 
        className="chess-board" 
        >
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
                <Button type="primary" size="large" shape="round" onClick={confirm}
                >确认</Button>
                <Button type="primary" size="large" shape="round" onClick={resetGame} danger>重新开始</Button>
            </div>


        </div>
      )
}

export default GameBoard;