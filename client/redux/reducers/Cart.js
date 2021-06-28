import { QTY_INCREMENT, QTY_DECREMENT, ITEM_ADD, ITEM_DELETE } from '../actions/ActionTypes'

const initialState = {
    itemCarts: []
};
const Catagorie = (state = initialState, action) => {
    const { itemCarts } = state
    switch (action.type) {
        case QTY_INCREMENT:
            return 1
        case QTY_DECREMENT:
            return 1
        case ITEM_ADD:
            return {
                ...state,
                itemCarts: itemCarts.concat(action.payLoad.itemCart),
            } 
        case ITEM_DELETE:
            return {
                ...state,
                itemCarts: itemCarts.filter(item => item.id != action.payLoad.id),
            } 
        default:
            return state;
    }
}
export default Catagorie