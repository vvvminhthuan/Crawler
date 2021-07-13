import Head from 'next/head'
import React, {useEffect} from 'react'

import Header from './header'
import Footer from './footer'
import Aside from './aside'
import Chats from 'componets/Chats'
import config from 'config'

import { useSelector} from 'react-redux'

import SocketClient from 'socket.io-client'

type LayoutProps = {
    title?: string,
    description?: string
    categoriesMenu?: any
}

const Layout : React.FC<LayoutProps> = ({children, title, description, categoriesMenu}) =>{
    const signIn = useSelector((state:any) => state.signIn)
    let socket = SocketClient('//localhost:8484/chat')
    
    useEffect(()=>{
        if (signIn) {
            socket.on('connect', function () {
                console.log('da ket noi duoc server chats nhe!')
            })
            socket.on('send', function(fullname, objPersont) {
                console.log(fullname, objPersont)
            })
            socket.emit('receives', 'Client da nhan dc thong tin')
        }
        windownEvent()
    }, [signIn])

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
    const getParent = (elementName : string, tagElement: any): any =>{
        let strClassName = tagElement ? tagElement.className : ''
        if (strClassName == null || strClassName == '') {
            return null
        }
        if (typeof(strClassName) == 'string' && strClassName.indexOf(elementName) >= 0) {
            return tagElement
        }else{
            return getParent(elementName, tagElement.parentElement)
        }
        
    }
    const getChildren = (elementName: string, tagElement : any) : any => {
        if (!tagElement) {
            return null
        }
        let child = tagElement.querySelectorAll(`.${elementName}`)
        if (child) {
            return child[0]
        }
        return null
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
                        {/* <Chats /> */}
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