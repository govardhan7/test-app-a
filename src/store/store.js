import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers/CartReducer';
import UserReducer from './reducers/UserReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: UserReducer,

});

const reduxStore = createStore(rootReducer);

export default reduxStore;