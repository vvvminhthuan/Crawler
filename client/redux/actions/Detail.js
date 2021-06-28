import * as types from './ActionTypes'

export const detailQtyIncrement = () => {
    return {
        type: types.DETAIL_QTY_INCREMENT
    }
}
export const detailQtyDecrement = () => {
    return {
        type: types.DETAIL_QTY_DECREMENT
    }
}
export const detailQtyReset = () =>{
    return {
        type: types.DETAIL_QTY_RESET
    }
}