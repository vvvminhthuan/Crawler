import User from './User'
import {getParent} from 'helpers/common'

import { useEffect } from 'react'
import { useSelector} from 'react-redux'

const ListUsers = () => {
    const userInfo = useSelector((state:any) => state.userInfo)
    useEffect(() => {
        
    }, [userInfo])

    const handleMini = (e) => {
        let parentElenmet = getParent('vertical-item', e.target)
        if (parentElenmet.classList.contains('active')) {
            parentElenmet.classList.remove('active')
        }
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
                <div className="direct-chat-messages list-user">
                    {userInfo.groupChats.map(item => <User key={item.id} user={item} mySelf={userInfo.id}/>)}
                </div>
                {/* /.direct-chat-messages*/}
            </div>
            {/*  /.card-body */}
            <div className="card-footer">
                <div className="input-group flex-r">
                    <input type="text" name="message" placeholder="Search User ..." className="form-control js-input-user" autoComplete="off"/>
                </div>
            </div>
            {/*  /.card-footer*/}
        </div>
    )
}
  
export default ListUsers