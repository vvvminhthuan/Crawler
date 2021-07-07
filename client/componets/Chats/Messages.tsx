import React from 'react'
import Image from 'next/image'

type MessageProperty = {
    dataContent: Object,
    isRight: boolean
}

const Messages : React.FC<MessageProperty> = ({dataContent, isRight}) => {
    return (
        <div className={`chat-msg${isRight? ' right' : ''}`}>
            {/* .chat-infos */}
            <div className="chat-infos flex-r">
                <span className="chat-name">Alexander Pierce</span>
                <span className="chat-timestamp">23 Jan 2:00 pm</span>
            </div>
            <div className="chat-content flex-r">
                {/*  /.chat-infos */}
                <Image src="/stores/images/user1-128x128.jpg" alt="Message User Image" width="35px" height="35px" className="img-circle" />
                {/*  /.chat-img */}
                <div className="chat-text">
                    Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!
                </div>
            </div>
            {/*  /.chat-text */}
        </div>
    )
}
  
export default Messages