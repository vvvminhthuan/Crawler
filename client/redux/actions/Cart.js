import * as types from './ActionTypes'

export const qtyIncrement = () => {
    return {
        type: types.QTY_INCREMENT
    }
}
export const qtyDecrement = () => {
    return {
        type: types.QTY_DECREMENT
    }
}
export const itemAdd = (value) => {
    return {
        type: types.ITEM_ADD,
        payLoad: value
    }
}
export const itemDelete = (value) => {
    return {
        type: types.ITEM_DELETE,
        payLoad: value
    }
}