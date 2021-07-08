import { USER_INFO } from '../actions/ActionTypes'

const initialState = {
    info: {}
}

const userReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case USER_INFO:
            return {...state, info: [action.payload]}
        default:
            return state
    }
}


export default userReducer