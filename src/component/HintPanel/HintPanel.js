import React , {useEffect, useState} from 'react'
import './HintPanel.css';
import Groove from '../Groove/Groove';
import LittlePoint from './LittlePoint';

function HintPanel(props){
    const [panelId, setPanelId] = useState(0);
    const [curStep, setCurStep] = useState(0);
    const [fontColor, setFontColor] = useState("white");
    
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
                <LittlePoint/>
                <LittlePoint/>
                <LittlePoint/>
                <LittlePoint/>
            </div>

            <Groove isCurStep={fontColor=="blue"}/>
            <Groove isCurStep={fontColor=="blue"}/>
            <Groove isCurStep={fontColor=="blue"}/>
            <Groove isCurStep={fontColor=="blue"}/>

        </div>
      )
}

export default HintPanel;