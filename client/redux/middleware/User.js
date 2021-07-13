import { setUserInfo } from '../actions/Users'
import {signOut, signIn as acSignIn} from '../actions/SignIn'
import {getInfoUserByAuth} from 'api/Users'

export const getInfoUser = () => (dispatch, getState) =>{
    const { signIn, userInfo } = getState()
    if (!signIn) {
        getInfoUserByAuth()
        .then((result) => {
            if (result.success) {
                dispatch(acSignIn())
                dispatch(setUserInfo(result.results[0]))
            }else{
                console.log('day')
                dispatch(setUserInfo({
                    success: false
                }))
                dispatch(signOut())
            }
        }).catch((err) => {
            dispatch(signOut())
        })
    }
    
}