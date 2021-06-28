import { CATAGORIE_SHOW, CATAGORIE_PRICE, CATAGORIE_BRAND } from '../actions/ActionTypes'

const initialState = {
    isShow: false,
    // brandObject: {},
    // priceArray: [0,200000],
};
const Catagorie = (state = initialState, action) => {
    switch (action.type) {
        case CATAGORIE_SHOW:
            return {
                ...state,
                isShow: action.payLoad,
            }
        // case CATAGORIE_PRICE:
        //     return {
        //         ...state,
        //         priceArray: action.payLoad.priceArray,
        //     }
        // case CATAGORIE_BRAND:
        //     let stateBrand = state.brandObject ? state.brandObject: {}
        //     return {
        //         ...state,
        //         brandObject: Object.assign(stateBrand, action.payLoad.brandObject),
        //     }
        default:
            return state;
    }
}
export default Catagorie