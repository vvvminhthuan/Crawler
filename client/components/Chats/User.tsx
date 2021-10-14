import React from 'react'
import Image from 'next/image'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { createGroup } from 'api/Chats'
import { addGroup } from 'redux/actions/Chats'

type UserProperty = {
    user: any,
    mySelf: any,
    chats: any,
    action: any
}

const User : React.FC<UserProperty> = ({user, mySelf, chats, action}) => {
    const handleClick = () => {
        if (!user.groupId) {            
            showGroupChat(user.groupId)
        }else{
            action.addGroup({
                groupId: user.groupId,
                messages: [
                    {
                        id: 1,
                        message: '',
                        dateTime: '2021-09-24 15:25:55',
                        read: true 
                    }
                ],
                numMessage: 4,
                edit: false,
                mini: false
            })
            showGroupChat(user.groupId)
        }
    }
    const showGroupChat = (groupId) => {
        let verticalItem = document.getElementById(`vertical-item-${groupId}`)
        let itemMessage = document.getElementById(`item-message-${groupId}`)
        if (verticalItem) {
            verticalItem.classList.add('active')
            itemMessage.classList.remove('active')
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
        action: bindActionCreators({addGroup}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)