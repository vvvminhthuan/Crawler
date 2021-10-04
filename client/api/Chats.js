import api from './ApiBase'
import { CHAT_GROUP } from './RouteBase'

const {POST, GET, PUT, DELETE} = api()

export const createGroup = (body) => {
    return POST(CHAT_GROUP, body)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}