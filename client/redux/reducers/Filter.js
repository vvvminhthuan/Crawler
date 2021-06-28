import { URL_SEARCH, PRODUCTS_SORT } from '../actions/ActionTypes'
import config from '../config'
const initialState = {
    urlSearch: '?',
    urlCategory: '?',
    valueSort: config.SORT_NAME_ASC
};
const Filter = (state = initialState, action) => {
    switch (action.type) {
        case URL_SEARCH:
            return {
                ...state,
                urlSearch: action.payLoad
            }
        case PRODUCTS_SORT:
            return {
                ...state,
                valueSort: action.payLoad
            }
        default:
            return state;
    }
}
export default Filter