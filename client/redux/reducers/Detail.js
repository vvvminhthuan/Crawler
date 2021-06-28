import { DETAIL_QTY_INCREMENT, DETAIL_QTY_DECREMENT, DETAIL_QTY_RESET } from '../actions/ActionTypes'

const initialState = {
    qtyNum: 1,
};
const Catagorie = (state = initialState, action) => {
    let { qtyNum } = state
    switch (action.type) {
        case DETAIL_QTY_INCREMENT:
            return {
                ...state,
                qtyNum: qtyNum + 1
            }
        case DETAIL_QTY_DECREMENT:
            return {
                ...state,
                qtyNum : qtyNum <= 1 ? 1 : qtyNum - 1
            }
        case DETAIL_QTY_RESET:
            return {
                ...state,
                qtyNum : 1
            }
        default:
            return state;
    }
}
export default Catagorie