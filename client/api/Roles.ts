import api from './ApiBase'
import { ROLES, ROLES_TREE } from './Router'
const {POST, GET, PUT, DELETE} = api()

export const getRoles = (id?: any): Promise<any[]> => {
    if (typeof id == undefined) {
        id = ''
    }
    return GET(`${ROLES}/${id}`)
    .then((result) => {
        return result.results
    }).catch((err) => {
        console.log('api getRoles error: ',err)
    })
}
export const getRolesTree = (): Promise<any[]> => {
    return GET(`${ROLES_TREE}`)
    .then((result) => {
        return result.results
    }).catch((err) => {
        console.log('api getRoles error: ',err)
    })
}