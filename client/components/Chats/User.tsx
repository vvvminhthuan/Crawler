import React from 'react'
import Image from 'next/image'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createGroup, getMessages } from 'api/Chats'
import { addGroup, miniGroup } from 'redux/actions/Chats'
import { updateUersGroupChats } from 'redux/actions/Users'

type UserProperty = {
    user: any,
    idSelf: any,
    chats: any,
    action: any
}

const User : React.FC<UserProperty> = ({user, idSelf, chats, action}) => {
    const handleClick = () => {
        if (!user.groupId) {            
            // tao group moi
            let users = {
                users: `${idSelf},${user.id}`
            }
            createGroup(users)
            .then((result) => {
                let group = {
                    userId: user.id,
                    groupId: result.results[0].groupId,
                    userName: user.firstName + ' ' + user.lastName,
                    messages: [],
                    numMessage: null,
                    edit: false,
                    mini: false
                }
                action.updateUersGroupChats({
                    id: user.id,
                    groupId: group.groupId
                })
                action.addGroup(group)
            }).catch((err) => {
                
            })
        }else{
            // load list message
            getMessages({
                groupId:user.groupId, 
                userId: idSelf
            })
            .then(({success, results}) => {
                if (success) {
                    action.addGroup({
                        userId: user.id,
                        groupId: user.groupId,
                        userName: user.firstName + ' ' + user.lastName,
                        messages: results.messages,
                        numMessage: results.numMessage,
                        edit: false,
                        mini: false
                    })
                }
            }).catch((err) => {
                
            })            
        }
    }
    return (
        <div className="item flex-r" onClick={handleClick}>
            <div className="item-avatar online">
                {/*  /.user-infos */}
                <Image src="/stores/images/user1-128x128.jpg" alt="Message User Image" width="35px" height="35px" className="img-circle" />
                {/*  /.user-infos */}
            </div>
            <div className="item-name">
                {user.firstName + ' ' + user.lastName}
            </div>
            {
                user.numMessage != null ? <div className="numb-message">{user.numMessage}</div> : null
            }
        </div>
    )
}
  
function mapStateToProps(state) {
    return {
        chats: state.chats,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators({
                    addGroup,
                    miniGroup,
                    updateUersGroupChats
                }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)