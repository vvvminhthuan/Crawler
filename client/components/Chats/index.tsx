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

const Chats = ({chats, signIn, userInfo, action}) => {

    useEffect(()=>{
        if (signIn) {
            chats.on(SOCKET.CONNECT, function () {
                console.log('da ket noi duoc server chats!')
            })
            chats.on(SOCKET.DISCONNECT, function (reason) {
                console.log('khong ket noi duoc server chats!', reason)
            })
            
            handleAddGroup(chats, userInfo.id, action)
            handleSendMessage(chats, userInfo.id, action)
            handleRead(chats, userInfo.id, action)
            handleWriting(chats, userInfo.id, action)
            handleOnline(chats, action)
            // test(chat)
        }
    }, [signIn])

    return (
        <div className="chat flex-r">
            <Vertical socket = {chats}/>
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