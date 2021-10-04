import React from 'react'
import Image from 'next/image'

import { createGroup } from 'api/Chats'

type UserProperty = {
    user: any,
    mySelf: any
}

const User : React.FC<UserProperty> = ({user, mySelf}) => {
    const handleClick = (e) => {

    }
    return (
        <div className="item flex-r" onClick={(e) => handleClick(e)}>
            <div className="item-avatar online">
                {/*  /.user-infos */}
                <Image src="/stores/images/user1-128x128.jpg" alt="Message User Image" width="35px" height="35px" className="img-circle" />
                {/*  /.user-infos */}
            </div>
            <div className="item-name">
                {user.firstName + ' ' + user.lastName}
            </div>
        </div>
    )
}
  
export default User