import {Emoji} from 'lib/Emoji'
import GroupIcons from './GroupIcons'
const Emojis = () => {
    return (
        <div className="group-emoji">
            <div className="list-item">
                { Emoji.map((item, index) => <GroupIcons key={index} icons = {item}/>)}
            </div>
            <div className="list-group flex-r">
                { Emoji.map((item) => <li>item[0]</li>)}
            </div>
        </div>
    )
}
  
export default Emojis