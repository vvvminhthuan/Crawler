import { setUserInfo } from '../actions/Users'
import {signOut, signIn as acSignIn} from '../actions/SignIn'
import {getInfoUserByAuth} from 'api/Users'

export const getInfoUser = () => (dispatch, getState) =>{
    const { signIn } = getState()
    if (!signIn) {
        getInfoUserByAuth()
        .then((result) => {
            if (result.success) {
                dispatch(acSignIn())
                let useInfo = {
                    success: true
                }
                Object.assign(useInfo, result.results[0])
                dispatch(setUserInfo(useInfo))
            }else{
                dispatch(setUserInfo({
                    success: false
                }))
                dispatch(signOut())
            }
        }).catch((err) => {
            dispatch(setUserInfo({
                success: false
            }))
            dispatch(signOut())
        })
    }
    
}