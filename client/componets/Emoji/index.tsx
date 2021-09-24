import {Emoji} from 'lib/Emoji'
import GroupIcons from './GroupIcons'
import {getParent} from 'helpers/common'

const Emojis = () => {
    const handleClick = (e) =>{
        let parentElenmet = getParent('input-group', e.target)
        let index = e.target.getAttribute('data-group')
        let listItem = parentElenmet.getElementsByClassName('list-item')
        let group = listItem[0].getElementsByClassName('group')
        for (let index = 0; index < group.length; index++) {
            let element = group[index];
            element.classList.remove('active')
        }
        let groupTab = document.getElementsByClassName('js-group-tab')
        for (let index = 0; index < groupTab.length; index++) {
            let element = groupTab[index];
            element.classList.remove('active')
        }
        let element = parentElenmet.getElementsByClassName(`js-tab-${index}`)
        element[0].classList.add('active')
        e.target.classList.add('active')
    }
    return (
        <div className="group-emoji">
            <div className="list-item">
                { Emoji.map((item, index) => <GroupIcons key={index} icons = {item} index={index}/>)}
            </div>
            <div className="list-group flex-r">
                { Emoji.map((e, i) => <li className={`js-group-tab ${i==0? 'active': ''}`} key={i} data-group= {i} onClick={(e)=> handleClick(e)}>{e[0].key}</li>)}
            </div>
        </div>
    )
}
  
export default Emojis