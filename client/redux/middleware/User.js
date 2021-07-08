import { setUserInfo } from '../actions/Users'
import {signOut, signIn} from '../actions/SignIn'
import {getInfoUserByAuth} from 'api/Users'

export const getInfoUser = () => (dispatch, getState) =>{
    const { userInfo } = getState()
    if (Object.keys(userInfo).length < 5) {
        getInfoUserByAuth()
        .then((result) => {
            if (result.success) {
                setUserInfo(result.results[0])
                dispatch(signIn())
            }else{
                dispatch(signOut())
            }
        }).catch((err) => {
            dispatch(signOut())
        })
    }else{
        dispatch(signIn())
    }
}