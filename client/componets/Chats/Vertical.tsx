import VerticalItem from './VerticalItem'
import ListUsers from './ListUsers'

import { useSelector } from 'react-redux'
import {useEffect} from 'react'

const Vertical = () => {
    const chats = useSelector((state:any) => state.chats)
    useEffect(() => {
    }, [chats])
    
    return (
        <div className="content-vertical flex-r" id="content-vertical">
            {
                chats.map((item, index) => {
                    <VerticalItem groupId ={item.groupId} content = {item} key={index}/>
                })
            }
            <ListUsers/>
        </div>
    )
}
  
export default Vertical