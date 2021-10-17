import { USER_INFO, USER_INFO_ADD_GROUP, USER_INFO_EDIT_GROUP } from '../actions/ActionTypes'

const initialState = null

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_INFO:
            return action.payload
        case USER_INFO_ADD_GROUP:
            return action.payload
        case USER_INFO_EDIT_GROUP:
            let group = state.groupChats.filter(item => item.id == action.payload.id)[0]
            group = {
                ...group, 
                groupId: action.payload.groupId
            }
            let groupChats = [
                ...state.groupChats.filter(item => item.id != action.payload.id),
                group
            ]
            return {
                ...state, 
                groupChats: groupChats.sort(compare)
            }
        default:
            return state
    }
}

const compare = (a, b) => {
    if ( a.id < b.id ){
        return -1;
    }
    if ( a.id > b.id ){
        return 1;
    }
    return 0;
}

export default userReducer