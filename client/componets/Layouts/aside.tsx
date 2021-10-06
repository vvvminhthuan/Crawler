import NavAside from 'componets/NavAside'
import Link from 'next/link'
import Image from 'next/image'

import { useSelector} from 'react-redux'

const Aside = () => {
    const userInfo = useSelector((state:any) => state.userInfo)
    return (
        <aside className="main-sidebar scrollbar">
            {/* Brand Logo */}
            <Link href="/">
                <a className="brand-link">
                    <span className="brand-text">Crawle XDA</span>
                </a>
            </Link>

            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel flex-r">
                    <div className="image">
                        <Image src="/stores/images/user1-128x128.jpg" alt="User Avatar" width="35px" height="35px" className="img-circle" />
                    </div>
                    <div className="info flex-r">
                        <Link href="/">
                            <a href="/" className="d-block">{`${userInfo.firstName} ${userInfo.lastName}`}</a>
                        </Link>
                        <Link href="/logout">
                            <a href="/logout" className="sign-out">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                    <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>
                            </a>
                        </Link>
                    </div>
                </div>
                <span className="bottom-line"></span>
                {/* Sidebar Menu */}
                <NavAside />
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    )
}

export default Aside