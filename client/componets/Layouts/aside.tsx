import NavAside from 'componets/NavAside'
import Link from 'next/link'
import Image from 'next/image'

const Aside = () => {
    return (
        <aside className="main-sidebar">
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
                    <div className="info">
                        <a href="#" className="d-block">Alexander Pierce</a>
                    </div>
                </div>

                {/* Sidebar Menu */}
                <NavAside />
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    )
}
  
export default Aside