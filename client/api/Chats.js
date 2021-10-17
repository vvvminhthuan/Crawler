import api from './ApiBase'
import { CHAT_GROUP, CHAT_MESSAGES } from './RouteBase'

const {POST, GET, PUT, DELETE} = api()

export const createGroup = (body) => {
    return POST(CHAT_GROUP, body)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}

export const getMessages = (params) => {
    return GET(`${CHAT_MESSAGES}/${params.groupId}/${params.userId}`)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}