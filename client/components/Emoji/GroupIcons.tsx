import React from 'react'
import Icon from './Icon'

type GroupProperty = {
    icons: Array<object>,
    index: number
}

const GroupIcons : React.FC<GroupProperty> = ({icons, index}) => {
    return (
        <ul className={`group js-tab-${index} ${index==0? 'active': ''}`}>
            { icons.map((item:any, index) => <Icon key={index} emoji = {item.key} />) }
        </ul>
    )
}
  
export default GroupIcons