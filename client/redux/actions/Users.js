import * as types from './ActionTypes'

export const setUserInfo = (info) => {
    return {
        type: types.USER_INFO,
        payload: info
    }
}
export const updateUersGroupChats = (info) => {
    return {
        type: types.USER_INFO_EDIT_GROUP,
        payload: info
    }
}