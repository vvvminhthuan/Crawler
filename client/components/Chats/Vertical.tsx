import VerticalItem from './VerticalItem'
import ListUsers from './ListUsers'

import {useEffect} from 'react'
import { connect } from 'react-redux'

const Vertical = ({chats}) => {
    return (
        <div className="content-vertical flex-r" id="content-vertical">
            {
                chats.map((item, index) => {
                    return <VerticalItem groupId ={item.groupId} content = {item} key={index}/>
                })
            }
            <ListUsers />
        </div>
    )
}
  
function mapStateToProps(state) {
    return {
        chats: state.chats,
    }
}

export default connect(mapStateToProps)(Vertical)