import React from 'react'
import Image from 'next/image'

type UserProperty = {
    userInfo: Object
}

const User : React.FC<UserProperty> = ({userInfo}) => {
    return (
        <div className="item flex-r">
            <div className="item-avatar online">
                {/*  /.user-infos */}
                <Image src="/stores/images/user1-128x128.jpg" alt="Message User Image" width="35px" height="35px" className="img-circle" />
                {/*  /.user-infos */}
            </div>
            <div className="item-name">
                {/* {dataContent} */}
                Hoàng Minh Thuận
            </div>
        </div>
    )
}
  
export default User