import React from 'react'
import Icon from './Icon'

type GroupProperty = {
    icons: Array<object>,
    index: number,
    handleMessage?: any, 
    message?: any,
    tabActive: number
}

const GroupIcons : React.FC<GroupProperty> = ({icons, index, handleMessage, message, tabActive}) => {
    return (
        <ul className={`group ${index==tabActive? 'active': ''}`}>
            { icons.map((item:any, index) => <Icon key={index} emoji = {item.key} handleMessage={handleMessage} message={message}/>) }
        </ul>
    )
}
  
export default GroupIcons