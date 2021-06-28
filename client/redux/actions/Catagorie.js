import * as types from './ActionTypes'

export const catagorieShow = (value) => {
    return {
        type: types.CATAGORIE_SHOW,
        payLoad: value
    }
}
export const catagoriePrices = (value) => {
    return {
        type: types.CATAGORIE_PRICE,
        payLoad: value
    }
}
export const catagorieBrand = (value) => {
    return {
        type: types.CATAGORIE_BRAND,
        payLoad: value
    }
}