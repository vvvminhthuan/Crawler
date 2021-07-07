import api from './ApiBase'
import { SIGN_IN, SIGN_OUT } from './RouteBase'

export const apiSignIn = (body) => {
    body = JSON.stringify(body)
    console.log(api, body)
    return api.get('/users', body)
    .then(result => result)
    .catch((err) => {
        console.log(err + '')
    })
}
export const apiSignOut = () => {
    return ApiBase.get(SIGN_OUT)
    .then((result) => {
        console.log(result)
        return result
    })
    .catch((err) => {
        
    })
}