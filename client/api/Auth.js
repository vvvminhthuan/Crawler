import ApiBase from './ApiBase'
import { SIGN_IN, SIGN_OUT } from './RouteBase'

export const SignIn = (body) => {
    return ApiBase.post(SIGN_IN, body)
    .then(result => result)
    .catch((err) => {
        
    })
}
export const SignOut = () => {
    return ApiBase.get(SIGN_OUT)
    .then((result) => result)
    .catch((err) => {
        
    })
}