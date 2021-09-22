import React from 'react'
import Icon from './Icon'

type GroupProperty = {
    icons: Array<object>
}

const GroupIcons : React.FC<GroupProperty> = ({icons}) => {
    return (
        <ul className="group">
            { icons.map((item:any, index) => <Icon key={index} value = {item.key} />) }
        </ul>
    )
}
  
export default GroupIcons