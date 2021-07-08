import * as types from './ActionTypes'

export const setUserInfo = (info) => {
    return {
        type: types.USER_INFO,
        payload: info
    }
}