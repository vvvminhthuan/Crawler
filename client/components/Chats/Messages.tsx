import React from 'react'
import Image from 'next/image'

import { timeToJSONLocal } from 'helpers/common'

type MessageProperty = {
    dataContent: any,
    isRight: boolean
}

const Messages : React.FC<MessageProperty> = ({dataContent, isRight}) => {
    return (
        <div className={`chat-msg${isRight? ' right' : ''}`}>
            {/*  /.chat-text */}
            <div className="chat-content flex-r">
                {/*  /.chat-infos */}
                {/* <Image src="/stores/images/user1-128x128.jpg" alt="Message User Image" width="35px" height="35px" className="img-circle" /> */}
                {/*  /.chat-img */}
                <div className="chat-text">
                    {/* {dataContent} */}
                    {dataContent.content}
                </div>
            </div>
            {/*  /.chat-text */}
            {/* .chat-infos */}
            <div className="chat-infos flex-r">
                <span className="chat-name"></span>
                <span className="chat-timestamp">{timeToJSONLocal(dataContent.createdAt)}</span>
            </div>
        </div>
    )
}
  
export default Messages