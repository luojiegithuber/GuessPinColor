import React , {useEffect, useState,useRef,useImperativeHandle} from 'react'
import './ChatDrawer.css';
import MsgRow from './MsgRow';
import { Drawer, Button, Badge ,Input } from 'antd';
//import SocketClient from './SocketClient'

import io from 'socket.io-client'
const socket = io('ws://localhost:3010');


//监听服务器返回的消息

const ChatDrawer = () => {
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState('');
    const [msgArr, setMsgArr] = useState([]);
    const [count, setCounter] = useState(1)
    const countRef = useRef(count);
    const msgArrRef = useRef(msgArr);

    
    useEffect(() => {
        //及时更新count值
        countRef.current = count;  
        msgArrRef.current = msgArr;  

    });

    useEffect(() => {
        mounteMy();
        return closeSocket;
    }, []);

    const mounteMy = () => {
        console.log("触发mounteMy");
        socket.on('recvMsgFromServer',function(data){
            console.log('client receive :' , data);
            addMsg(data);   // 本地添加 
        })
        
    }

    const closeSocket = () => {
        console.log("关闭Socket");
        socket.close();
    }

    const { TextArea } = Input;
  
    //开
    const showDrawer = () => {
        setVisible(true);
    };
  
    //关
    const onClose = () => {
        setVisible(false);
    };

    
    //发送消息
    const sendMsg = () => {
        socket.emit('sendMsgToServer',msg);//发送给客户端
        setMsg(''); // 清空
        document.getElementById('msg-chat-input').value = '';//清空
    }

    //添加消息
    const addMsg = (thismsg) => {


        setMsgArr([
            ...msgArrRef.current,
            {
                msg: thismsg,
                user: 'username',
            }
        ])

    }

    //读取信息
    const setMymsg = () => {
        setMsg(document.getElementById('msg-chat-input').value); //操作dom节点获得值？？？？
    }

  
    return (
      <div id="chat">

        <Badge count={5}>
            <Button type="primary" onClick={showDrawer}>
                打开聊天室
            </Button>
        </Badge>

        <Drawer
          title="聊天面板"
          placement="right"
          closable={true}
          onClose={onClose}
          visible={visible}
          mask={false}
          width={500}
        >
            <div id="msg-panel">
                {msgArr.map(obj => {
                    return <MsgRow msgObj={obj}/>
                })}
            </div>
            <br/>
            <TextArea id="msg-chat-input" value={msg} onChange={setMymsg}  autoSize={{minRows: 2, maxRows: 6}}></TextArea>
            <br/><br/>
            <Button type="primary" onClick={sendMsg} style={{float:'right'}}>
                发送
            </Button>
        </Drawer>
      </div>
    );
  };
  
  export default ChatDrawer;
