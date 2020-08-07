import React , {useEffect, useState,useRef,useImperativeHandle} from 'react'
import io from 'socket.io-client'

// 指定连接服务器的地址
io('http://localhost:3000')

export default class ClientSocketIo extends React.Component {
    componentDidMount () {
    io.on('connection', socket => {
      // socket.io-client连接成功

      socket.on('data', data => {
        // 接收服务端回传的消息
      })
      socket.emit('data', () => {
        // 发送消息到服务端
      })
      socket.on('disconnect', () => {
        // socket连接失败
      })
    })
  }
  render () {
    return null
  }
}