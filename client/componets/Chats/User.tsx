import React from 'react'
import Image from 'next/image'
import { connect , useDispatch} from 'react-redux'
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
            action.addGroup({
                groupId: user.groupId,
                messages: [
                    {
                        id: null,
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