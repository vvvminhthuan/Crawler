import Image from 'next/image'

import Messages from './Messages'
import Emojis from '../Emoji'
import {getParent} from 'helpers/common'

const VerticalItem = () => {
    const handleIcon = (e) => {
        let parentElenmet = getParent('input-group', e.target)
        let groupEmoji = parentElenmet.getElementsByClassName('group-emoji')[0]
        if (groupEmoji.classList.contains('active')) {
            groupEmoji.classList.remove('active')
        } else {
            groupEmoji.classList.add('active')
        }
    }
    const handleMini = (e) => {
        let parentElenmet = getParent('vertical-item', e.target)
        if (parentElenmet.classList.contains('active')) {
            parentElenmet.classList.remove('active')
        }
    }
    const handleClose = (e) => {
        let parentElenmet = getParent('vertical-item', e.target)
        parentElenmet.remove()
    }
    return (
        <div className="vertical-item active" id ={`vertical-item-${0}`}>
            {/* .card-header */}
            <div className="card-header flex-r">
                <Image src="/stores/images/user1-128x128.jpg" alt="Message User Image" width="35px" height="35px" className="img-circle" />
                <h3 className="card-title">Direct Chat</h3>
                <div className="card-tools flex-r">
                    <span data-toggle="tooltip" title="3 New Messages" className="bg-success">3</span>
                    <button type="button" className="btn btn-tool" onClick={(e) => handleMini(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                    </button>
                    {/* <button type="button" className="btn btn-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        </svg>
                    </button> */}
                    <button type="button" className="btn btn-tool" onClick={(e)=> handleClose(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
                {/*  Conversations are loaded here */}
                <div className="direct-chat-messages">
                    {/*  Message. Default to the left */}
                    <Messages dataContent='' isRight={false} />
                    {/*  /.direct-chat-msg */}
                    {/*  Message to the right */}
                    <Messages dataContent='' isRight={true}/>
                    {/*  /.direct-chat-msg */}
                    {/*  Message. Default to the left */}
                    <Messages dataContent='' isRight={false}/>
                    {/*  /.direct-chat-msg */}
                    {/*  Message to the right */}
                    <Messages dataContent='' isRight={true}/>
                    {/*  /.direct-chat-msg */}
                    {/*  Message. Default to the left */}
                    <Messages dataContent='' isRight={false}/>
                    {/*  /.direct-chat-msg */}
                    {/*  Message to the right */}
                    <Messages dataContent='' isRight={true}/>
                    {/*  /.direct-chat-msg */}
                </div>
                {/* /.direct-chat-messages*/}
            </div>
            {/*  /.card-body */}
            <div className="card-footer">
                <form action="#" method="post">
                    <div className="input-group flex-r">
                        <Emojis />
                        <a className="btn-icon" onClick= {(e) => handleIcon(e)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-emoji-smile" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                            </svg>
                        </a>
                        <input type="text" name="message" placeholder="Type Message ..." className="form-control js-input-chat"/>
                        <button type="submit" className="btn-success">
                            <svg enableBackground="new 0 0 24 24" height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                                <path d="m8.75 17.612v4.638c0 .324.208.611.516.713.077.025.156.037.234.037.234 0 .46-.11.604-.306l2.713-3.692z"/>
                                <path d="m23.685.139c-.23-.163-.532-.185-.782-.054l-22.5 11.75c-.266.139-.423.423-.401.722.023.3.222.556.505.653l6.255 2.138 13.321-11.39-10.308 12.419 10.483 3.583c.078.026.16.04.242.04.136 0 .271-.037.39-.109.19-.116.319-.311.352-.53l2.75-18.5c.041-.28-.077-.558-.307-.722z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            {/*  /.card-footer*/}
        </div>
    )
}
  
export default VerticalItem