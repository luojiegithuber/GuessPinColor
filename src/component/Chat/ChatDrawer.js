import React , {useEffect, useState,useRef,useImperativeHandle} from 'react'
import './ChatDrawer.css';
import MsgRow from './MsgRow';
import { Drawer, Button, Badge ,Input,message } from 'antd';
//import SocketClient from './SocketClient'

import io from 'socket.io-client'
const socket = io('ws://localhost:3010');


//监听服务器返回的消息

const ChatDrawer = () => {
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState('');
    const [msgArr, setMsgArr] = useState([]);
    const msgArrRef = useRef(msgArr);

    const [user, setUser] = useState(String(new Date().getTime()));//用时间作为用户名字
    
    useEffect(() => {
        //及时更新msgArr
        msgArrRef.current = msgArr;  
    });

    useEffect(() => {
        mounteMy();
        return closeSocket;
    }, []);

    const mounteMy = () => {
        console.log("触发mounteMy");
        socket.on('recvMsgFromServer',function(data){
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

    //输入为空报错
    const inputNullError = () => {
        message.error('输入不要为空');
    };
    
    //发送消息
    const sendMsg = () => {
        if(!msg){//输入不能为空
            inputNullError();
            return null;
        }
        socket.emit('sendMsgToServer',{
            msg: msg,
            user: user
        });//发送给客户端
        setMsg(''); // 清空
        document.getElementById('msg-chat-input').value = '';//清空
    }

    //【按下回车发送消息】
    const setMymsgByEnter = () => {
        let newMsg = msg.slice(0,msg.length-1);
        socket.emit('sendMsgToServer',newMsg);//发送给客户端
        setMsg(''); // 清空

        document.getElementById('msg-chat-input').value = '';//清空
    }

    //添加消息
    const addMsg = (msgObj) => {

        if(msgArrRef.current.length > 20){//客户端只能显示20条消息
            msgArrRef.current.shift();
        }

        setMsgArr([
            ...msgArrRef.current,
            msgObj
        ])

        //让滚动条保持在最低的位置
        var scrollTarget = document.getElementById("msg-panel");
        //scrollTarget.scrollHeight是获取dom元素的高度，然后设置scrollTop
        if(scrollTarget){
            scrollTarget.scrollTop=scrollTarget.scrollHeight;
        }

    }

    //读取信息
    const setMymsg = () => {
        setMsg(document.getElementById('msg-chat-input').value); //操作dom节点获得值？？？？
    }

  
    return (
      <div id="chat">

        <Badge count={5}>
            <Button type="primary" size="large" onClick={showDrawer}>
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
                    return <MsgRow msgObj={obj} isMyseif={obj.user == user}/>
                })}
            </div>
            <br/>
            <TextArea id="msg-chat-input" value={msg} onChange={setMymsg}   autoSize={{minRows: 2, maxRows: 6}}></TextArea>
            <br/><br/>
            <Button type="primary" onClick={sendMsg} style={{float:'right'}}>
                发送
            </Button>
        </Drawer>
      </div>
    );
  };
  
  export default ChatDrawer;
