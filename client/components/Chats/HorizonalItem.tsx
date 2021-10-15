import Image from 'next/image'
import { useDispatch } from 'react-redux'

import { removeGroup, miniGroup } from 'redux/actions/Chats'

const HorizontalItem = ({groupId, numMessage, mini}) => {
    const dispatch =  useDispatch()
    //remove group chat
    const handleRemove = (e) => {
        dispatch(removeGroup({
            groupId: groupId
        }))
    }
    //show group chat
    const handleExpand = (e) => {
        dispatch(miniGroup({
            groupId: groupId,
            mini: false
        }))
    }
    return (
        <div className={`item-message ${mini ? 'active' : ''}`} id={`item-message-${groupId}`} onClick={(e) => handleExpand(e)}>
            <span className="action-close" onClick={(e)=>handleRemove(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
            <Image src="/stores/images/user1-128x128.jpg" alt="User Avatar" width="55px" height="55px" className="img-circle" />
            <span className="count">{numMessage}</span>
        </div>
    )
}
  
export default HorizontalItem