import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import "./Products.css";
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
const Products = () => {
  const { activeUser, cartLength, userData } = useSelector(selectUserData);
  const [productsData, setProductsData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  let selectedCategory = categoryId !== null ? categoryId : "All Products";

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const activeUserCart = activeUser?.cart;
  console.log(activeUserCart);
  const handleButtonClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleCategoryClick = (category) => {
    setCategoryId(category);
    setDropdownVisible(false);
  };

  const filteredProducts = productsData
    ? categoryId
      ? productsData
        .sort((a, b) => a.id - b.id)
        .filter((item) => categoryId === item.category)
      : productsData
    : [];

  filteredProducts.forEach(filteredProduct => {
    const matchingCartItem = activeUserCart?.find(cartItem => cartItem.id === filteredProduct.id);

    filteredProduct.itemExist = !!matchingCartItem;
  });

  console.log(filteredProducts);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const categoriesJson = await categoriesResponse.json();
        setCategoryData(categoriesJson);

        const productsResponse = await fetch("https://dummyjson.com/products");
        const productsJson = await productsResponse.json();
        setProductsData(productsJson.products);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="product-page">
        <div className="side-nav">
          <div>
            <button
              className={`category-button ${categoryId === null ? "active" : ""}`}
              onClick={() => setCategoryId(null)}
              aria-label="Show All Products"
            >
              Show All
            </button>
            <hr />
          </div>
          {categoryData ? (
            categoryData.sort().map((category) => (
              <div key={category}>
                <button
                  className={`category-button ${categoryId === category ? "active" : ""}`}
                  onClick={() => handleCategoryClick(category)}
                  aria-label={`Show ${category} Products`}
                  aria-pressed={categoryId === category ? "true" : "false"}
                >
                  {category}
                </button>
                <hr />
              </div>
            ))
          ) : (
            <div>No Data</div>
          )}
        </div>
        <div className="mobile-nav">
          <button className="dropdown" onClick={handleButtonClick} aria-haspopup="listbox" aria-expanded={isDropdownVisible}>
            <div className="dropdown-label">
              <span className="selected-category">{selectedCategory}</span>{" "}
              <span>▼</span>
            </div>
          </button>
          {isDropdownVisible && (
            <ul className="dropdown-list" role="listbox">
              <li
                className="dropdown-item"
                onClick={() => {
                  setCategoryId(null);
                  setDropdownVisible(false);
                }}
                role="option"
                aria-selected={categoryId === null ? "true" : "false"}
              >
                Show All
              </li>
              <hr />
              {categoryData ? (
                categoryData.sort().map((category) => (
                  <React.Fragment key={category}>
                    <li
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(category)}
                      role="option"
                      aria-selected={categoryId === category ? "true" : "false"}
                    >
                      {category}
                    </li>
                    <hr />
                  </React.Fragment>
                ))
              ) : (
                <div>No Data</div>
              )}
            </ul>
          )}
        </div>
        <div className="product-cards">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))
          ) : (
            <div className="no-data">No data available</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;