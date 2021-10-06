import React from 'react'
import ReactDOM from 'react-dom'
import Image from 'next/image'

import { createGroup } from 'api/Chats'

import VerticalItem from './VerticalItem'

type UserProperty = {
    user: any,
    mySelf: any
}

const User : React.FC<UserProperty> = ({user, mySelf}) => {
    const handleClick = () => {
        if (!user.groupId) {
            console.log('tao group', mySelf, user)
            showGroupChat(user.groupId?? 999)
        }else{
            showGroupChat(user.groupId)
        }
    }
    const showGroupChat = (groupId) => {
        let groupChat = document.getElementById(`vertical-item-${groupId}`)
        if (groupChat) {
            groupChat.classList.add('active')
        }else{
          
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
  
export default User