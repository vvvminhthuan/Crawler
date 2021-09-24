import { ADD_MESSAGE, REMOVE_MESSAGE, ADD_GROUP, REMOVE_GROUP, EDIT, READ } from '../actions/ActionTypes'
/*
    {
        groupId: null,
        messages: [
            {
                id: null,
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
const initialState = [
    {
        groupId: 0,
        messages: [
            {
                id: 0,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            }
        ],
        numMessage: 4,
        edit: false,
        mini: true
    },
    {
        groupId: 1,
        messages: [
            {
                id: 0,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            },
            {
                id: 1,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            },
            {
                id: 2,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            },
            {
                id: 3,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            },
            {
                id: 4,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            }
        ],
        numMessage: 4,
        edit: false,
        mini: true
    },
    {
        groupId: 2,
        messages: [
            {
                id: 0,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            }
        ],
        numMessage: 4,
        edit: false,
        mini: true
    },
    {
        groupId: 3,
        messages: [
            {
                id: 0,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            }
        ],
        numMessage: 4,
        edit: false,
        mini: true
    },
    {
        groupId: 4,
        messages: [
            {
                id: 0,
                message: "Is this template really for free? That's unbelievable!Is this template really for free? That's unbelievable!",
                dateTime: '2021-09-24 15:25:55',
                read: true 
            }
        ],
        numMessage: 4,
        edit: false,
        mini: true
    }
]

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
            state.map((item, index) => {
                if (item.groupId == action.payload.groupId) {
                    state.splice(index, 1) // xoa 1 item khi groupId trung payload
                }
            })
            return state
        case ADD_GROUP:
            return state.push(action.payload)
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