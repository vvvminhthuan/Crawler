import {Emoji} from 'lib/Emoji'
import GroupIcons from './GroupIcons'
import {useState} from 'react'

const Emojis = ({handleMessage, message}) => {
    const [active, setActive] = useState(0)
    return (
        <div className="group-emoji">
            <div className="list-item">
                { Emoji.map((item, index) => <GroupIcons key={index} icons = {item} index={index} handleMessage={handleMessage} message={message} tabActive={active}/>)}
            </div>
            <div className="list-group flex-r">
                { Emoji.map((e, i) => <li className={`${i==active? 'active': ''}`} key={i} data-group= {i} onClick={()=> setActive(i)}>{e[0].key}</li>)}
            </div>
        </div>
    )
}
  
export default Emojis