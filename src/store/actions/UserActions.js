export const storeUserData = (userData) => ({
    type: "storeUserData",
    payload: userData,
});
export const resetUserData = () => ({
    type: "resetUserData",
});

export const addToUserCart = (item) => ({
    type: "addToUserCart",
    payload: item,
  });
  
  export const removeFromUserCart = (item) => ({
    type: "removeFromUserCart",
    payload: item,
  });
  
  export const removeAllItemsFromCart = () => ({
    type: "removeAllItemsFromCart",
  });