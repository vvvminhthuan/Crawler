import {getParent} from 'helpers/common'

const Icon = ({emoji, handleMessage, message}) => {
    const handIcon = (e) => {
        // let parentElenmet = getParent('input-group', e.target)
        // let element: any = parentElenmet.getElementsByClassName('js-input-chat')
        // element[0].value = element[0].value + emoji
        // element[0].focus()
        // let mess = ''
        handleMessage(message + emoji)
    }
 
    return (
        <i className="icon" onClick={(e)=>handIcon(e)}>{emoji}</i>
    )
}
  
export default Icon