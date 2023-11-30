import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductCard.css";
// import { addItem } from "../../store/actions/CartActions";
import { addToUserCart } from "../../store/actions/UserActions";
import { toast } from "react-toastify";


const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.user.userData);
  const isLoggedIn = usersData?.some(user => user.isActive === true);
  
  const handleCartButton = () => {
    if(isLoggedIn) {
    dispatch(addToUserCart(item));
    toast.success("Added to Cart!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
    });
  }else {
    toast.info("Please Login!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      hideProgressBar: true,
      closeButton: false,
    });
  }
  };

  return (
    <div key={item.id} className="product-card" role="article">
      <div className="product-card__content">
        <div className="product-card__heading">{item.title}</div>
        <div className="product-card__image">
          <img src={item.images[0]} alt={item.title} aria-label={item.title} />
        </div>
        <div className="product-card__description">{item.description}</div>
        <div className="product-card__price-card">
          <p className="product-card__price">{`MRP Rs.${item.price}`}</p>
          <button
            className="product-card__explore-button"
            onClick={handleCartButton}
            aria-label={`Add ${item.title} to Cart`}
            tabIndex="0"
            data-testid={`buy-now-button-${item.id}`}
          >
            Buy Now
          </button>
          <button
            className="product-card__explore-button-mob-btn"
            onClick={handleCartButton}
            aria-label={`Add ${item.title} to Cart at Rs.${item.price}`}
            tabIndex="0"
            data-testid={`buy-now-button-mob-${item.id}`}
          >
            Buy Now {`@ Rs.${item.price}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
