import Messages from './Messages'

const VerticalItem = () => {
    return (
        <div className="vertical-item">
            {/* .card-header */}
            <div className="card-header flex-r">
                <h3 className="card-title">Direct Chat</h3>
                <div className="card-tools flex-r">
                    <span data-toggle="tooltip" title="3 New Messages" className="bg-success">3</span>
                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                    </button>
                    {/* <button type="button" className="btn btn-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        </svg>
                    </button> */}
                    <button type="button" className="btn btn-tool" data-card-widget="remove">
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
                        <input type="text" name="message" placeholder="Type Message ..." className="form-control"/>
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