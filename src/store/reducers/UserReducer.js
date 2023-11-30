import { addItemToCart, removeItemFromCart } from "../utils";

const INITIAL_STATE = {
    userData: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "storeUserData":
            return {
                ...state,
                userData: action.payload,
            };
        case "resetUserData":
            return {
                ...state,
                userData: null,
            };
        case "addToUserCart":
            const activeUserIndex = state.userData.findIndex(user => user.isActive);

            let updatedUser;

            if (activeUserIndex !== -1) {
                const existingCartItemIndex = state.userData[activeUserIndex].cart.findIndex(item => item.id === action.payload.id);

                if (existingCartItemIndex !== -1) {
                    updatedUser = {
                        ...state.userData[activeUserIndex],
                        cart: state.userData[activeUserIndex].cart.map((item, index) =>
                            index === existingCartItemIndex
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    };
                } else {
                    updatedUser = {
                        ...state.userData[activeUserIndex],
                        cart: [...state.userData[activeUserIndex].cart, { ...action.payload, quantity: 1 }],
                    };
                }
            }

            const updatedUserData = [...state.userData];
            if (updatedUser) {
                updatedUserData[activeUserIndex] = updatedUser;
            }

            return {
                ...state,
                userData: updatedUserData,
            };


        case "removeFromUserCart":
            const activeUserIndexToRemove = state.userData.findIndex(user => user.isActive);

            if (activeUserIndexToRemove !== -1) {
                const updatedUserToRemove = {
                    ...state.userData[activeUserIndexToRemove],
                    cart: removeItemFromCart(state.userData[activeUserIndexToRemove].cart || [], action.payload),
                };

                const updatedUserDataToRemove = [...state.userData];
                updatedUserDataToRemove[activeUserIndexToRemove] = updatedUserToRemove;

                return {
                    ...state,
                    userData: updatedUserDataToRemove,
                };
            }

            return state;

        case "removeAllItemsFromCart":
            const activeUserIndexToRemoveAll = state.userData.findIndex(user => user.isActive);

            if (activeUserIndexToRemoveAll !== -1) {
                const updatedUserToRemoveAll = {
                    ...state.userData[activeUserIndexToRemoveAll],
                    cart: [],
                };

                const updatedUserDataToRemoveAll = [...state.userData];
                updatedUserDataToRemoveAll[activeUserIndexToRemoveAll] = updatedUserToRemoveAll;

                return {
                    ...state,
                    userData: updatedUserDataToRemoveAll,
                };
            }

            return state;

        default:
            return state;
    }
};

export default UserReducer;
