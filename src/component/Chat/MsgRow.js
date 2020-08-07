import React , {useEffect, useState,useRef,useImperativeHandle} from 'react'
import './MsgRow.css';

import { Avatar,Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const MsgRow = (props) => {
    const [isMyseif, setIsMyseif] = useState(true);
    //const [msg, setMsg] = useState('你好呀');

    const { TextArea } = Input;
  
    return (
        <div class="msg-row">
            <Avatar icon={<UserOutlined />} className={isMyseif?"no-avatar":"avatar"} />
            <div class="msg-said">{props.msgObj.msg}</div>
            <Avatar icon={<UserOutlined />} className={isMyseif?"avatar":"no-avatar"}/>
        </div>
    );
  };
  
  export default MsgRow;
