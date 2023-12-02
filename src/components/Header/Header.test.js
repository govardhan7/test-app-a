import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "./Header";
import { storeUserData } from "../../store/actions/UserActions";

jest.mock("../Cart/Cart", () => () => <div data-testid="mocked-cart" />);

const mockStore = configureStore();

describe("Header Component", () => {
  test("renders header with logo and menu", () => {
    const store = mockStore({
      user: { userData: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const logo = screen.getByAltText("Logo");
    const homeLink = screen.getByText(/home/i);
    const productsLink = screen.getByText(/products/i);

    expect(logo).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
  });

  test("toggles cart on button click", () => {
    const store = mockStore({
      user: { userData: [] }, 
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const cartButton = screen.getByLabelText("Toggle Cart");

    expect(screen.queryByTestId("mocked-cart")).toBeNull();

    fireEvent.click(cartButton);

    expect(screen.getByTestId("mocked-cart")).toBeInTheDocument();
  });

  test("renders authentication links", () => {
    const store = mockStore({
      user: { userData: [] }, 
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const signinLink = screen.getByText(/signin/i);
    const registerLink = screen.getByText(/register/i);

    expect(signinLink).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

  test("renders user greeting when user is signed in", () => {
    const store = mockStore({
      user: {
        userData: [
          {
            isActive: true,
            firstName: "John",
            cart: [],
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const greeting = screen.getByText(/hi, john/i);
    expect(greeting).toBeInTheDocument();
  });

  test("signs out user and displays success message", async () => {
    const store = mockStore({
      user: {
        userData: [
          {
            isActive: true,
            firstName: "John",
            cart: [],
          },
        ],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/sign out/i));

    await waitFor(() => screen.getByText(/signed out/i));

    const signinLink = screen.getByText(/signin/i);
    expect(signinLink).toBeInTheDocument();
  });
});
