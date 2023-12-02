import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import Cart from "./Cart";
import {
  addToUserCart,
  removeFromUserCart,
  removeAllItemsFromCart,
} from "../../store/actions/UserActions";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mockStore = configureMockStore();

describe("Cart Component", () => {
  const mockCartItems = [
    {
      id: 1,
      title: "Product A",
      price: 50,
      images: ["image-url"],
      quantity: 2,
    },
    {
      id: 2,
      title: "Product B",
      price: 30,
      images: ["image-url"],
      quantity: 1,
    },
  ];

  test("renders Cart component with mock data", () => {
    jest.spyOn(require("react-redux"), "useSelector").mockImplementation((selector) =>
      selector({ user: { userData: [{ isActive: true, cart: mockCartItems }] } })
    );

    const store = mockStore({ user: { userData: [{ isActive: true, cart: mockCartItems }] } });

    const { getByText, getAllByAltText } = render(
      <Provider store={store}>
        <Router>
          <Cart handleCloseCart={() => {}} />
        </Router>
      </Provider>
    );

    expect(getByText(/Product A/i)).toBeInTheDocument();
    expect(getAllByAltText(/Product A/i).length).toBe(1);
    expect(getByText(/Product B/i)).toBeInTheDocument();
    expect(getAllByAltText(/Product B/i).length).toBe(1);
  });

  test("handles remove from cart action", () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatchMock);

    jest.spyOn(require("react-redux"), "useSelector").mockImplementation((selector) =>
      selector({ user: { userData: [{ isActive: true, cart: mockCartItems }] } })
    );

    const store = mockStore({ user: { userData: [{ isActive: true, cart: mockCartItems }] } });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Cart handleCloseCart={() => {}} />
        </Router>
      </Provider>
    );

    const removeButton = getByText(/-+/i);
    fireEvent.click(removeButton);

    expect(dispatchMock).toHaveBeenCalledWith(removeFromUserCart(mockCartItems[0]));
  });

  test("handles add to cart action", () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatchMock);

    jest.spyOn(require("react-redux"), "useSelector").mockImplementation((selector) =>
      selector({ user: { userData: [{ isActive: true, cart: mockCartItems }] } })
    );

    const store = mockStore({ user: { userData: [{ isActive: true, cart: mockCartItems }] } });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Cart handleCloseCart={() => {}} />
        </Router>
      </Provider>
    );

    const addButton = getByText(/\+/i);
    fireEvent.click(addButton);

    expect(dispatchMock).toHaveBeenCalledWith(addToUserCart(mockCartItems[0]));
  });

  test("handles proceed to checkout action", async () => {
    const dispatchMock = jest.fn();
    jest.spyOn(require("react-redux"), "useDispatch").mockReturnValue(dispatchMock);

    jest.spyOn(require("react-redux"), "useSelector").mockImplementation((selector) =>
      selector({ user: { userData: [{ isActive: true, cart: mockCartItems }] } })
    );

    const store = mockStore({ user: { userData: [{ isActive: true, cart: mockCartItems }] } });

    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <Cart handleCloseCart={() => {}} />
        </Router>
      </Provider>
    );

    const checkoutButton = getByText(/Proceed to Checkout/i);
    fireEvent.click(checkoutButton);

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(removeAllItemsFromCart());
    });
  });
});
