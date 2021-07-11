import { Provider } from 'react-redux'
import useStore from '../redux'
import {getInfoUser} from 'redux/middleware/User'

import React, {useEffect} from 'react'
import { useRouter } from 'next/router'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
import 'public/scss/app.scss'

const nProgresStart = () => {
    NProgress.start()
}
const nProgresDone = () => {
    NProgress.done()
}

export default function App({Component, pageProps}){
    const store = useStore(pageProps.initialReduxState)
    const {signIn} = store.getState()
    const router = useRouter()
    
    useEffect(() =>{
        store.dispatch(getInfoUser())
        if (signIn!=null&&!signIn) {
            router.push('/login')
        }else{
            router.events.on('routeChangeStart', (url)=>{
                nProgresStart()
            })
            router.events.on('routeChangeComplete', (url) => {
                setTimeout(() =>{
                    nProgresDone()
                }, 500)
            })
            router.events.on('routeChangeError', (url) => {
                setTimeout(() =>{
                    nProgresDone()
                }, 500)
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
    },[signIn])
    return (
        <Provider store = { store }>
            <Component {...pageProps}/>
        </Provider>
    )
}