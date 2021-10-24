import User from './User'
import {getParent} from 'helpers/common'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ListUsers = () => {
    const userInfo = useSelector((state:any) => state.userInfo)
    const [textSearch, setTextSearch] = useState('')
    const [groupChats, setGroupChats] = useState([])

    useEffect(() => {
        setGroupChats(userInfo.groupChats)
        if (!textSearch) {
            setGroupChats(userInfo.groupChats)
        }
    }, [userInfo, textSearch])

    const handleMini = (e) => {
        let parentElenmet = getParent('vertical-item', e.target)
        if (parentElenmet.classList.contains('active')) {
            parentElenmet.classList.remove('active')
        }
    }

    const handleSearch = (e) => {
        setTextSearch(e.target.value)
        // dispatch(groupUserFilter({
        //     text: textSearch
        // }))
        setGroupChats(groupChats.filter(item => {
            if ((item.firstName + item.lastName).indexOf(textSearch)>=0) {
                return item
            }
        }))
        console.log(groupChats)
    }
    return (
        <div className="vertical-item list-user flex-c">
            {/* .card-header */}
            <div className="card-header flex-r">
                <h3 className="card-title">List Users</h3>
                <div className="card-tools flex-r">
                    <button type="button" className="btn btn-tool" onClick={(e) => handleMini(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                    </button>
                </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
                {/*  Conversations are loaded here */}
                <div className="direct-chat-messages list-item">
                    {groupChats.map(item => <User key={item.id} user={item} idSelf={userInfo.id}/>)}
                </div>
                {/* /.direct-chat-messages*/}
            </div>
            {/*  /.card-body */}
            <div className="card-footer">
                <div className="input-group flex-r">
                    <input type="text" onChange={e=>handleSearch(e)} value={textSearch} name="message" placeholder="Search User ..." className="form-control js-input-user" autoComplete="off"/>
                </div>
            </div>
            {/*  /.card-footer*/}
        </div>
    )
}
  
export default ListUsers