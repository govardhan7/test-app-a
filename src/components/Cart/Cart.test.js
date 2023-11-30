import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import configureMockStore from "redux-mock-store";
import Cart from "./Cart";
import {
  addItem,
  removeItem,
  removeAllItems,
} from "../../store/actions/CartActions";

// Mock the useDispatch and useNavigate hooks
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Create a mock store
const mockStore = configureMockStore();

describe("Cart Component", () => {
  // Mock data for cart items
  const mockCartItems = [
    {
      id: 2,
      title: "iPhone X",
      price: 899,
      images: [
        "https://i.dummyjson.com/data/products/2/1.jpg",
        "https://i.dummyjson.com/data/products/2/2.jpg",
        "https://i.dummyjson.com/data/products/2/3.jpg",
        "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      ],
      quantity: 2,
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      price: 1249,
      images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
      quantity: 1,
    },
  ];

  // Test case for rendering with mock data
  test("renders Cart component with mock data", () => {
    // Mock the useSelector hook
    jest
      .spyOn(require("react-redux"), "useSelector")
      .mockImplementation((selector) => selector({ cart: { cartItems: mockCartItems } }));

    const store = mockStore({ cart: { cartItems: mockCartItems } });

    const { getByText, getAllByAltText } = render(
      <Provider store={store}>
        <Router>
          <Cart handleCloseCart={() => {}} />
        </Router>
      </Provider>
    );

    // Assertions based on your mock data
    expect(getByText(/iphone x/i)).toBeInTheDocument();
    expect(getAllByAltText(/iphone x/i).length).toBe(1); 
    expect(getByText(/samsung universe 9/i)).toBeInTheDocument();
    expect(getAllByAltText(/samsung universe 9/i).length).toBe(1); 

  });

  // Add more test cases for actions like adding, removing items, and checking the total
});
