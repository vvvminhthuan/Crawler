import Head from 'next/head'
import React, {useEffect} from 'react'

import Header from './header'
import Footer from './footer'
import Aside from './aside'
import Chats from 'components/Chats'
import config from 'config'
import { getParent, getChildren } from 'helpers/common'

import { useSelector} from 'react-redux'

type LayoutProps = {
    title?: string,
    description?: string
    categoriesMenu?: any
}

const Layout : React.FC<LayoutProps> = ({children, title, description, categoriesMenu}) =>{
    const signIn = useSelector((state:any) => state.signIn)
    
    useEffect(()=>{
        windownEvent()
    })

    const windownEvent = () => {
        window.addEventListener('click', function(element) {
            setEmptyClass('expand')
            let elParent = getParent('dropdown', element.target)
            let children = getChildren('dropdown-menu', elParent)
            if (children) {
                children.classList.add('expand')
            }
        })
    }

    const setEmptyClass = (strClass: string) : void =>{
        let listClass = document.querySelectorAll(`.${strClass}`)
        listClass.forEach(item => {
            item.classList.remove(strClass)
        })
    }
    
    if (signIn) {
        return(
            <>
                <Head>
                    <title>{title||config.APP_NAME}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content={description || ''} />
                </Head>
                <header>
                    <Header/>
                </header>
                {/* Main Sidebar Container */}
                <Aside />
                <main>
                    <div className="content">
                        {children}
                        <Chats />
                    </div>
                </main>
                <footer>
                    <Footer />
                </footer>
            </>
        )
    }
   return null
}

export default Layout