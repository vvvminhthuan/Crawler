import signInReducer from './SignIn'
// import catagorieReducer from './Catagorie'
// import cartReducer from './Cart'
// import detailReducer from './Detail'
// import productsReducer from './Products'
// import filterReducer from './Filter'

import { combineReducers } from 'redux'

const allReducers = combineReducers({
    signIn: signInReducer,
    // catagorie: catagorieReducer,
    // cart: cartReducer,
    // detail: detailReducer,
    // products: productsReducer,
    // filter: filterReducer,
})

export default allReducers