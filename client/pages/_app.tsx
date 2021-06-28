import { Provider } from 'react-redux'
import store from '../redux'

import 'public/scss/app.scss'
export default function App({Component, pageProps}){
    return (
        <Provider store = { store }>
            <Component {...pageProps}/>
        </Provider>
    )
}