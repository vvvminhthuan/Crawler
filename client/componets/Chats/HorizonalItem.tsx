import Image from 'next/image'

import {getParent} from 'helpers/common'

const HorizontalItem = ({groupId}) => {
    const handleRemove = (e) => {
        let parentElenmet = getParent('item-message', e.target)
        parentElenmet.remove()
    }
    const handleExpand = (e) => {
        let parentElenmet = getParent('item-message', e.target)
        let groupId = e.target.getAttribute('data-group')
        let verticalItem: any = document.getElementById(`vertical-item-${groupId}`)
    }
    return (
        <div className="item-message" data-group={groupId} onClick={(e) => handleExpand(e)}>
            <span className="action-close" onClick={(e)=>handleRemove(e)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </span>
            <Image src="/stores/images/user1-128x128.jpg" alt="User Avatar" width="55px" height="55px" className="img-circle" />
            <span className="count">99</span>
        </div>
    )
}
  
export default HorizontalItem