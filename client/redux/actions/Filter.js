import * as types from './ActionTypes'

export const setUrlSearch = (value) => {
    return {
        type: types.URL_SEARCH,
        payLoad: value
    }
}
export const proSort = (value) => {
    return {
        type: types.PRODUCTS_SORT,
        payLoad: value
    }
}