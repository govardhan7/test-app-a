import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToUserCart,
  removeFromUserCart,
  removeAllItemsFromCart,
} from "../../store/actions/UserActions";
import { toast } from "react-toastify";

import "./Cart.css";
const selectUserData = (state) => {
  const userData = state.user.userData;
  console.log(userData);

  if (!Array.isArray(userData)) {
    return {
      activeUser: null,
      cartLength: 0,
    };
  }
  console.log(userData);

  const activeUserIndex = userData?.findIndex(user => user.isActive);
  console.log(activeUserIndex);

  const cartItems = activeUserIndex !== -1 ? userData[activeUserIndex].cart : null;
  console.log(cartItems);
  
  const cartLength = cartItems ? cartItems?.length : 0;

  return {
    cartItems,
    cartLength,
  };
};

const Cart = ({ handleCloseCart }) => {
  const { cartItems, cartLength  } = useSelector(selectUserData);
  console.log(cartItems);



  const checkoutPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  const handleCart = () => {
    if (cartItems?.length > 0) {
      handleCloseCart(false);
      toast.success("Order Placed!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
      });
    } else {
      navigate("/");
      handleCloseCart(false);
    }
  };

  const dispatch = useDispatch();
  return (
    <div className="Cart" tabIndex={0}>
      <div className="cartheading" tabIndex={0}>
        <span tabIndex={0}>My Cart</span>{" "}
        <span
          className="cart-close"
          tabIndex={0}
          onClick={() => handleCloseCart(false)}
        >
          ✖
        </span>
      </div>
      <div className="cartList" tabIndex={0}>
        {cartItems?.length > 0 ? (
          <>
            {cartItems?.map((item, index) => (
              <div className="cartItem" key={index} tabIndex={0}>
                <img
                  src={item.images[0]}
                  className="cartProductImage"
                  alt={item.title}
                  tabIndex={0}
                />
                <div className="cartContainer" tabIndex={0}>
                  <p className="cardProductname" tabIndex={0}>
                    {item.title}
                  </p>
                  <button
                    className="cartAction"
                    onClick={() => dispatch(removeFromUserCart(item))}
                    tabIndex={0}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="cartAction"
                    onClick={() => dispatch(addToUserCart(item))}
                    tabIndex={0}
                  >
                    +
                  </button>{" "}
                  X {item.price}
                </div>
                <div className="cartProductprice" tabIndex={0}>{`Rs.${
                  item.quantity * item.price
                }`}</div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="no-items-text" tabIndex={0}>
              <span className="no-item-heading" tabIndex={0}>
                No items are in your cart
              </span>{" "}
              <span className="no-item-suggestion" tabIndex={0}>
                Your favorite items are just a click away
              </span>
            </div>
          </>
        )}
      </div>

      <div className={`checkout ${cartItems?.length > 0 ? "" : "start-shop"}`} tabIndex={0}>
        {cartItems?.length > 0 && (
          <p tabIndex={0}>Promo code can be applied in the Payment page</p>
        )}
        <button
          onClick={() => {
            handleCart();
            dispatch(removeAllItemsFromCart());
          }}
          className="checkout-button"
          tabIndex={0}
        >
          {cartItems?.length > 0 ? (
            <>
              <span tabIndex={0}>Proceed to Checkout</span>
              <span tabIndex={0}>Rs.{checkoutPrice} ▶</span>
            </>
          ) : (
            <span className="start-shopping" tabIndex={0}>
              Start Shopping
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;
