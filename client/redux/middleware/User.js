import { setUserInfo } from '../actions/Users'
import {signOut, signIn as acSignIn} from '../actions/SignIn'
import {getInfoUserByAuth} from 'api/Users'

export const getInfoUser = () => async (dispatch, getState) =>{
    const { userInfo, signIn } = getState()
    if (!signIn && !userInfo.id) {
        let result = await getInfoUserByAuth()
        if (result.success) {
            dispatch(setUserInfo(result.results[0]))
            dispatch(acSignIn())
        }else{
            dispatch(setUserInfo({}))
            dispatch(signOut())
        }
    } else {
        dispatch(acSignIn())
    }
}