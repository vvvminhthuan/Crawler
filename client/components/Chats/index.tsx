import {useEffect} from 'react'
import SocketClient, {io} from 'socket.io-client'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Horizontal from './Horizontal'
import Vertical from './Vertical'

import {SOCKET} from 'config/Socket'

import { handleAddGroup, handleSendMessage, handleRead, handleWriting, handleOnline, test } from 'lib/SocketEvents/Chats'
import { updateUersGroupChats, updateUersNumMessage, updateUersOnline } from 'redux/actions/Users'
import {addMessage, read, edit} from 'redux/actions/Chats'

const Chats = ({signIn, userInfo, action}) => {
    
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
            
            handleAddGroup(chat, userInfo.id, action)
            handleSendMessage(chat, userInfo.id, action)
            handleRead(chat, userInfo.id, action)
            handleWriting(chat, userInfo.id, action)
            handleOnline(chat, action)
            // test(chat)
        }
    }, [signIn])

    return (
        <div className="chat flex-r">
            <Vertical socket = {chat}/>
            <Horizontal />
        </div>
    )
}
  
function mapStateToProps(state) {
    return {
        signIn: state.signIn,
        userInfo: state.userInfo,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators({
                    updateUersGroupChats,
                    addMessage,
                    read,
                    edit,
                    updateUersNumMessage,
                    updateUersOnline
                }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats)