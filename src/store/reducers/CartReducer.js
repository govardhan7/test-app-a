import { addItemToCart, removeItemFromCart } from "../utils";

const INITIAL_STATE = {
  cartItems: [],
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "additem":
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case "removeItem":
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case "removeAllItems":
      return {
        ...state,
        cartItems: [], 
      };
    default:
      return state;
  }
};
export default CartReducer;