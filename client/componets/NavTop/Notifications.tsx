import Image from 'next/image'

const Notifications = () => {
    return (
        <ul className="navbar-nav ml-auto flex-r">
            {/* Messages Dropdown Menu */}
            <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-square" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    </svg>
                    <span className="badge badge-message">3</span>
                </a>
                <div className="dropdown-menu">
                    <div className="scroll-y">
                        <a href="#" className="dropdown-item">
                            {/* Message Start */}
                            <div className="media flex-r">
                                <Image src="/stores/images/user1-128x128.jpg" alt="User Avatar" width="45px" height="45px" className="img-circle" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Brad Diesel
                                        <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                    </h3>
                                    <p className="text-sm">Call me whenever you can...</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div>
                            {/* Message End */}
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            {/* Message Start */}
                            <div className="media flex-r">
                                <Image src="/stores/images/user1-128x128.jpg" alt="User Avatar" width="45px" height="45px" className="img-circle" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        John Pierce
                                        <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                                    </h3>
                                    <p className="text-sm">I got your message bro</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div>
                            {/* Message End */}
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            {/* Message Start */}
                            <div className="media flex-r">
                                <Image src="/stores/images/user1-128x128.jpg" alt="User Avatar" width="45px" height="45px" className="img-circle" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                    Nora Silvester
                                    <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                                    </h3>
                                    <p className="text-sm">The subject goes here</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                                </div>
                            </div>
                            {/* Message End */}
                        </a>
                    </div>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                </div>
            </li>
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                    <span className="badge badge-warning">15</span>
                </a>
                <div className="dropdown-menu">
                    <div className="scroll-y">
                        <span className="dropdown-item dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-envelope mr-2"></i> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-users mr-2"></i> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <i className="fas fa-file mr-2"></i> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </a>
                    </div>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
                </div>
            </li>
        </ul>
    )
}
  
export default Notifications