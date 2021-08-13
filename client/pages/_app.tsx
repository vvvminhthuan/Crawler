import { Provider } from 'react-redux'
import useStore from '../redux'
import {setUserInfo} from 'redux/actions/Users'
import {signIn as acSignIn, signOut} from 'redux/actions/SignIn'

import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import {getInfoUserByAuth} from 'api/Users'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
import 'public/scss/app.scss'

const nProgresStart = () => {
    NProgress.start()
}
const nProgresDone = () => {
    NProgress.done()
}

const noneRedirect = ['/signup', '/for-got', '/_error', '/reset-password']

export default function App({Component, pageProps}){
    const store = useStore(pageProps.initialReduxState)
    const router = useRouter()
    const {signIn, userInfo} = store.getState() 
    useEffect(() =>{
        router.events.on('routeChangeStart', (url)=>{
            nProgresStart()
        })
        router.events.on('routeChangeComplete', (url) => {
            setTimeout(() =>{
                nProgresDone()
            }, 100)
        })
        router.events.on('routeChangeError', (url) => {
            setTimeout(() =>{
                nProgresDone()
            }, 100)
        })

        if (!signIn&&userInfo==null) {
            getInfoUserByAuth()
            .then((result) => {
                if (result.success&&result.results[0]) {
                    store.dispatch(setUserInfo(result.results[0]))
                    store.dispatch(acSignIn())
                    router.push('/')
                }else{
                    store.dispatch(setUserInfo({
                        success: false
                    }))
                    store.dispatch(signOut())
                    if (noneRedirect.indexOf('/'+router.pathname.split('/')[1]) < 0) {
                        router.push('/login')
                    }
                }
            })
            .catch(e => {
                store.dispatch(setUserInfo({
                    success: false
                }))
                store.dispatch(signOut())
                if (noneRedirect.indexOf(router.pathname) < 0) {
                    router.push('/login')
                }
            })
        }
       
        return () =>{
            router.events.off('routeChangeStart', (url)=>{
                nProgresStart()
            })
            router.events.off('routeChangeComplete', (url) => {
                nProgresDone()
            })
            router.events.off('routeChangeError', (url) => {
                nProgresDone()
            })
        }
    },[signIn, userInfo])

    return (
        <Provider store = { store }>
            <Component {...pageProps}/>
        </Provider>
    )
}