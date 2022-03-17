import api from './ApiBase'
import { SIGN_IN, SIGN_OUT } from './Router'

const {POST, GET} = api()

export const apiSignIn = (body) => {
    // body = JSON.stringify(body)
    return POST(SIGN_IN, body)
    .then((result) => {
        return result
    }).catch((err) => {
    })
}
export const apiSignOut = () => {
    return GET(SIGN_OUT)
    .then((result) => {
        return result
    })
    .catch((err) => {
        console.log(err + '')
    })
}