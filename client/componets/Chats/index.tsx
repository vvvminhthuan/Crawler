import {useEffect} from 'react'
import SocketClient, {io} from 'socket.io-client'
import { useSelector} from 'react-redux'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

import {SOCKET} from 'config/Socket'

const Chats = () => {
    const signIn = useSelector((state:any) => state.signIn)
    let chat = SocketClient(SOCKET.URL + '/' + SOCKET.CHAT, {
        withCredentials: true,
        auth:{
            token: 'day la chuoi khoa bi mat'
        }
    })

    useEffect(()=>{
        if (signIn) {
            chat.on(SOCKET.CONNECT, function () {
                console.log('da ket noi duoc server chats!')
            })
            chat.on(SOCKET.DISCONNECT, function (reason) {
                console.log('khong ket noi duoc server chats!', reason)
            })
            chat.on('send', function(fullname, objPersont) {
                console.log(fullname, objPersont)
            })
            chat.emit('receives', 'Client da nhan dc thong tin')
        }
    }, [signIn])

    return (
        <div className="chat flex-r">
            <Vertical />
            <Horizontal />
        </div>
    )
}
  
export default Chats