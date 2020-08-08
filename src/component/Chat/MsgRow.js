import React , {useEffect, useState,useRef,useImperativeHandle} from 'react'
import './MsgRow.css';

import { Avatar,Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const MsgRow = (props) => {
    //const [isMyseif, setIsMyseif] = useState(true);
    //const [msg, setMsg] = useState('你好呀');

    const { TextArea } = Input;
  
    return (
        <div>
            <div className={props.isMyseif?"right-float":"left-float"}>用户{props.msgObj.user}</div>

            <div class="msg-row">
                <Avatar icon={<UserOutlined />} className={props.isMyseif?"no-avatar":"avatar"} />
                <div class="msg-said" style={{backgroundColor:(props.isMyseif?'#62B4D6':'#FFFFFF')}}>{props.msgObj.msg}</div>
                <Avatar icon={<UserOutlined />} className={props.isMyseif?"avatar":"no-avatar"}/>
            </div>
        </div>
    );
  };
  
  export default MsgRow;
