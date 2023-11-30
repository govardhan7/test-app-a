import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "./Header";

// Mock the Cart component
jest.mock("../Cart/Cart", () => () => <div data-testid="mocked-cart" />);

const mockStore = configureStore();

describe("Header Component", () => {
  test("renders header with logo and menu", () => {
    const store = mockStore({ cart: { cartItems: [] } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Assertions
    const logo = screen.getByAltText("Logo");
    const homeLink = screen.getByText(/home/i);
    const productsLink = screen.getByText(/products/i);

    expect(logo).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
  });

  test("toggles cart on button click", () => {
    const store = mockStore({ cart: { cartItems: [] } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Assertions
    const cartButton = screen.getByLabelText("Toggle Cart");

    // Initially, cart is not visible
    expect(screen.queryByTestId("mocked-cart")).toBeNull();

    // Click on the cart button
    fireEvent.click(cartButton);

    // Now, the cart should be visible
    expect(screen.getByTestId("mocked-cart")).toBeInTheDocument();
  });

  test("renders authentication links", () => {
    const store = mockStore({ cart: { cartItems: [] } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    // Assertions
    const signinLink = screen.getByText(/signin/i);
    const registerLink = screen.getByText(/register/i);

    expect(signinLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });
});
