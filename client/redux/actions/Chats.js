import * as types from './ActionTypes'

export const addChat = (payload) => {
    return {
        type: types.ADD_MESSAGE,
        payload: payload
    }
}
export const removeChat = (payload) => {
    return {
        type: types.REMOVE_MESSAGE,
        payload: payload
    }
}
export const addGroup = (payload) => {
    return {
        type: types.ADD_GROUP,
        payload: payload
    }
}
export const removeGroup = (payload) => {
    return {
        type: types.REMOVE_GROUP,
        payload: payload
    }
}
export const miniGroup = (payload) => {
    return {
        type: types.MINI_GROUP,
        payload: payload
    }
}
export const edit = (payload) => {
    return {
        type: types.EDIT,
        payload: payload
    }
}
export const read = (payload) => {
    return {
        type: types.READ,
        payload: payload
    }
}
export const numMessage = (payload) => {
    return {
        type: types.NUM_MESSAGE,
        payload: payload
    }
}