import { Provider } from 'react-redux'
import useStore from '../redux'

import 'public/scss/app.scss'
export default function App({Component, pageProps}){
    const store = useStore(pageProps.initialReduxState)
    let {signIn} = store.getState()
    console.log(signIn)
    return (
        <Provider store = { store }>
            <Component {...pageProps}/>
        </Provider>
    )
}