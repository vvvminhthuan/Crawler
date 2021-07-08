import api from './ApiBase'
import { USERS, USERS_INFO } from './RouteBase'

const {POST, GET, PUT, DELETE} = api()

export const getUserById = (params) => {
    return GET(`${USERS}/${params}`)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}
export const getAllUser = () => {
    return GET(USERS)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}
export const createUser = (body) => {
    return POST(USERS, body)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}
export const updateUser = (body, params) => {
    return PUT(`${USERS}/${params}`, body)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}
export const deleteUserById = (params) => {
    return DELETE(`${USERS}/${params}`)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}
export const getInfoUserByAuth = () => {
    return GET(USERS_INFO)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}