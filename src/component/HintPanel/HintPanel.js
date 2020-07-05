import React , {useEffect, useState,useRef,useImperativeHandle} from 'react'
import './HintPanel.css';
import Groove from '../Groove/Groove';
import LittlePoint from './LittlePoint';

function HintPanel(props,ref){
    const [panelId, setPanelId] = useState(0);
    const [curStep, setCurStep] = useState(0);
    const [fontColor, setFontColor] = useState("white");
    const [hintResult, setHintResult] = useState(['','','','']);
    const [arrLittlePointvType, setArrLittlePointvType] = useState(['','','','']);

    const childRef_1 = useRef(null);
    const childRef_2 = useRef(null);
    const childRef_3 = useRef(null);
    const childRef_4 = useRef(null);

   

    useImperativeHandle(ref, () => ({
        
        //整理球球冒泡出来的结果
        clearUpHintResult:() => {
            //如果是当前面板,就做整理
            if(fontColor==="blue"){
                let hintResult = [
                    childRef_1.current.getColor(),
                    childRef_2.current.getColor(),
                    childRef_3.current.getColor(),
                    childRef_4.current.getColor(),
                ];

                setHintResult(hintResult);

                return hintResult;//将整理的结果丢给父组件
            }
        },

        //用于接收父组件给过来的【全对】【半对】指标
        getCorrectNum:(full,half) => {
            console.log(full);
            console.log(half);

            for(let i=0;i<arrLittlePointvType.length;i++){
                if(full){
                    arrLittlePointvType[i] = "isFullCorrect";
                    full--;
                }else if(half){
                    arrLittlePointvType[i] = "isHalfCorrect";
                    half--;
                }else{
                    arrLittlePointvType[i] = null;
                }
            }//for

            setArrLittlePointvType(arrLittlePointvType)
            
        }

      }));


    useEffect(() => {
        setPanelId(props.panelId);
        setCurStep(props.curStep);
        setFontColor(props.curStep==props.panelId?"blue":"white")

    });


    return (
        <div 
        className="hint-panel" style={{color:fontColor}}
        >
            {panelId}
        
            <div className="little-panel" >
                <LittlePoint type={arrLittlePointvType[0]}/>
                <LittlePoint type={arrLittlePointvType[1]}/>
                <LittlePoint type={arrLittlePointvType[2]}/>
                <LittlePoint type={arrLittlePointvType[3]}/>
            </div>

            <Groove isCurStep={fontColor=="blue"} ref={childRef_1}/>
            <Groove isCurStep={fontColor=="blue"} ref={childRef_2}/>
            <Groove isCurStep={fontColor=="blue"} ref={childRef_3}/>
            <Groove isCurStep={fontColor=="blue"} ref={childRef_4}/>

        </div>
      )
}

HintPanel = React.forwardRef(HintPanel);
export default HintPanel;