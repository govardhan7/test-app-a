import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import Cart from "../Cart/Cart";
import { storeUserData, resetUserData } from "../../store/actions/UserActions";


const selectUserData = (state) => {
  const userData = state.user.userData;

  if (!Array.isArray(userData)) {
    return {
      activeUser: null,
      cartLength: 0,
    };
  }

  const activeUserIndex = userData.findIndex(user => user.isActive);

  const activeUser = activeUserIndex !== -1 ? userData[activeUserIndex] : null;

  const cartLength = activeUser ? activeUser.cart.length : 0;

  return {
    activeUser,
    cartLength,
    userData,
  };
};


const Header = () => {
  const dispatch = useDispatch();

  const { activeUser, cartLength, userData } = useSelector(selectUserData);

  const [showCart, setShowCart] = useState(false);

  const handleCart = (flag) => {
    if (flag === showCart) {
      setShowCart(!flag);
      return;
    }
    setShowCart(flag);
  };

  const handleSignOut =()=>{
    const updatedUserData = userData.map(user => ({ ...user, isActive: false }));
    dispatch(storeUserData(updatedUserData));

  }

  const isLoggedIn = false; // Placeholder value, you might fetch this from your state.
  const selectedUserData = useSelector(selectUserData);



  return (
    <div>
      {showCart && <Cart handleCloseCart={handleCart} />}
      <div className="header">
        <div className="navbar">
          <div className="logo section">
            <NavLink to="/">
              <img
                src="https://sabkabazaar-shopping.netlify.app/8481ee8780730d370ae0083ec252362a.png"
                alt="Logo"
              />
            </NavLink>
          </div>
          <div className="menu section">
            <NavLink exact to="/" className="main-menu">
              Home
            </NavLink>
            <NavLink to="/products" className="main-menu">
              Products
            </NavLink>
          </div>
          <div className="cart section">
            <div className="authentication">
              {activeUser ? (
                // Render this if there is an active user
                <>
                  <div className="greeting">Hi, {activeUser.firstName}</div>
                  <button className="sign-out" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </>
              ) : (
              
                <>
                  <Link to="/login" className="right-menu">
                    Sign In
                  </Link>
                  <Link to="/register" className="right-menu">
                    Register
                  </Link>
                </>
              )}
            </div>
            <div className="cart-image">
              <button
                className="cart-btn"
                onClick={() => handleCart(true)}
                aria-label="Toggle Cart"
              >
                <img
                  src="https://sabkabazaar-shopping.netlify.app/9e72c0213161254492ac6bb5ff5ffab1.svg"
                  height={50}
                  width={50}
                  alt="Cart Icon"
                />
                <p>{`${cartLength} items`}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
