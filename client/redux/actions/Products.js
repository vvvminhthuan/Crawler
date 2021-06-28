import * as types from './ActionTypes'

export const proAdd = (value) => {
    return {
        type: types.PRODUCTS_ADD,
        payLoad: value
    }
}