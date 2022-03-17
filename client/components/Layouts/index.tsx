import Head from 'next/head'
import React, {useEffect, useState} from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from 'redux/actions/SignIn'
import { setUserInfo } from 'redux/actions/Users'
import { apiSignOut } from 'api/Auth'
import { useRouter } from 'next/router'

import Header from './header'
import Footer from './footer'
import Aside from './aside'
import Chats from 'components/Chats'
import config from 'config'
import { getParent, getChildren } from 'helpers/common'

import SocketClient from 'socket.io-client'
import {SOCKET} from 'config/Socket'

type LayoutProps = {
    children?: any,
    title?: string,
    description?: string
    categoriesMenu?: any,
    signIn: any,
    action: any
}

const Layout : React.FC<LayoutProps> = ({children, title, description, categoriesMenu, signIn, action}) =>{
    const router = useRouter(),
          [showAside, setShowAside] = useState(true)
    let chats = SocketClient(SOCKET.URL + '/' + SOCKET.CHAT, {
        withCredentials: true,
        auth:{
            token: 'day la chuoi khoa bi mat'
        }
    })
    useEffect(()=>{
        
        windownEvent()
        if(!signIn){
            chats.disconnect()
        }
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

    const setEmptyClass = (strClass: string) : void =>{
        let listClass = document.querySelectorAll(`.${strClass}`)
        listClass.forEach(item => {
            item.classList.remove(strClass)
        })
    }

    const logOut = () => {
        apiSignOut()
        .then((result) => {
            if (result.success) {
                action.signOut()
                action.setUserInfo(null)
                chats.disconnect()
                router.push('/login')
            }
        }).catch((err) => {
            console.log(err + '')
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
                
                {/* Main Sidebar Container */}
                {showAside&&<Aside logOut={logOut}/>}
                <main>
                    <header>
                        <Header setShowAside={setShowAside} showAside={showAside}/>
                    </header>
                    <div className="content">
                        {children}
                        <Chats chats={ chats }/>
                    </div>
                    <footer>
                        <Footer />
                    </footer>
                </main>
            </>
        )
    }
   return null
}

function mapStateToProps(state) {
    return {
        signIn: state.signIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators({signOut, setUserInfo}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)