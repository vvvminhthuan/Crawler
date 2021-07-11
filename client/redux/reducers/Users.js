import { USER_INFO } from '../actions/ActionTypes'

const initialState = {
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO:
            return action.payload
        default:
            return state
    }
}


export default userReducer