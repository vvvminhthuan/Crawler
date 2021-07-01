import ApiBase from './ApiBase'
import { USERS } from './RouteBase'

export const getById = (params) => {
    return ApiBase.get(`${USERS}/${params}`)
    .then((result) => {
        
    }).catch((err) => {
        
    })
}
export const getAll = () => {
    return ApiBase.get(`${USERS}/${params}`)
    .then((result) => {
        
    }).catch((err) => {
        
    })
}
export const create = (body) => {
    return ApiBase.post(USERS, body)
    .then((result) => {
        
    }).catch((err) => {
        
    })
}
export const update = (body, params) => {
    return ApiBase.put(`${USERS}/${params}`, body)
    .then((result) => {
        
    }).catch((err) => {
        
    })
}
export const deleteById = (body, params) => {
    return ApiBase.get(`${USERS}/${params}`, body)
    .then((result) => {
        
    }).catch((err) => {
        
    })
}
export const getInfoByAuth = () => {
    return ApiBase.get(USERS)
    .then((result) => {
        
    }).catch((err) => {
        
    })
}