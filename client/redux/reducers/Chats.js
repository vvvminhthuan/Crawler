import { ADD_MESSAGE, REMOVE_MESSAGE, ADD_GROUP, REMOVE_GROUP, MINI_GROUP, EDIT, READ } from '../actions/ActionTypes'
/*
    {
        groupId: null,
        userName: user.firstName + ' ' + user.lastName,
        messages: [
            {
                id: 1,
                userId: 1,
                message: '',
                dateTime: '2021-09-24 15:25:55',
                read: true 
            }
        ],
        numMessage: 4,
        edit: false,
        mini: true
    }
*/
const initialState = []

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            state.map(item => {
                if (item.groupId == action.payload.groupId) {
                    item.messages.push(action.payload.message)
                }
            })
            return state
        case REMOVE_MESSAGE:
            state.map(item => {
                if (item.groupId == action.payload.groupId) {
                    item.messages.map((m, i) =>{
                        if (m.id == action.payload.id) {
                            item.splice(i, 1) // xoa 1 message khi message trung payload
                        }
                    })
                }
            })
            return state
        case REMOVE_GROUP:
            return state.filter(item => item.groupId != action.payload.groupId)
        case MINI_GROUP:
            return state.map(item => {
                if (item.groupId == action.payload.groupId) {
                    return Object.assign({}, item, {mini: action.payload.mini})
                }
                return item
            })
        case ADD_GROUP:
            let index = state.filter(item => item.groupId == action.payload.groupId)
            if (!index.length) { // khong ton tai thi them moi vao state
                return [
                    ...state,
                    action.payload
                ]
            }else{ // ton tai thi chuyen mini -> false
                return state.map(item => {
                    if (item.groupId == action.payload.groupId) {
                        return Object.assign({}, item, {mini: false})
                    }
                    return item
                })
            }
        case EDIT:
            state.map(item => {
                if (item.groupId == action.payload.groupId) {
                    item.edit = action.payload.edit
                }
            })
            return state
        case READ:
            state.map(item => {
                if (item.groupId == action.payload.groupId) {
                    item.messages.map((m, i) =>{
                        if (m.id == action.payload.id) {
                            m.read = action.payload.read
                        }
                    })
                }
            })
            return state
        default:
            return initialState
    }
}

export default chatReducer