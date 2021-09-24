import signInReducer from './SignIn'
import userReducer from './Users'
import chatReducer from './Chats'
// import catagorieReducer from './Catagorie'
// import cartReducer from './Cart'
// import detailReducer from './Detail'
// import productsReducer from './Products'
// import filterReducer from './Filter'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    signIn: signInReducer,
    userInfo: userReducer,
    chats: chatReducer
    // catagorie: catagorieReducer,
    // cart: cartReducer,
    // detail: detailReducer,
    // products: productsReducer,
    // filter: filterReducer,
})

export default allReducers