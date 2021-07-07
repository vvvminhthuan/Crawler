import * as types from './ActionTypes'

export const signIn = (payload) => {
    return {
        type: types.SIGN_IN,
        payload: payload
    }
}
export const signOut = () => {
    return {
        type: types.SIGN_OUT,
    }
}