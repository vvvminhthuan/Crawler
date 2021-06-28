import { PRODUCTS_ADD, PRODUCTS_FILTER_AMOUNT, PRODUCTS_FILTER_CTG, PRODUCTS_SORT_ASC, PRODUCTS_SORT_DESC, PRODUCTS_SORT_AMOUT_TO_MIN, PRODUCTS_SORT_AMOUT_TO_MAX} from '../actions/ActionTypes'

const initialState = {
    products: null,
};
const Products = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_ADD:
            return {
                products: action.payLoad
            }
        default:
            return state;
    }
}
export default Products