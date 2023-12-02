import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProductCard from "./ProductCard";
import { addToUserCart } from "../../store/actions/UserActions";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("ProductCard Component", () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  const mockStore = configureStore();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders ProductCard component with correct content", () => {
    mockSelector.mockReturnValue([]);
    const store = mockStore({ user: { userData: [] } });

    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <ProductCard item={mockItem} />
      </Provider>
    );

    expect(getByText(mockItem.title)).toBeInTheDocument();
    expect(getByText(mockItem.description)).toBeInTheDocument();
    expect(getByText(`MRP Rs.${mockItem.price}`)).toBeInTheDocument();
    expect(getByAltText(mockItem.title)).toBeInTheDocument();
    expect(getByText("Buy Now")).toBeInTheDocument(); // Check the initial button text
  });

  test("dispatches addToUserCart action on Buy Now button click", async () => {
    mockSelector.mockReturnValue([{ isActive: true, cart: [] }]);
    const store = mockStore({ user: { userData: [] } });

    const { getByTestId } = render(
      <Provider store={store}>
        <ProductCard item={mockItem} />
      </Provider>
    );

    fireEvent.click(getByTestId(`buy-now-button-${mockItem.id}`));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(addToUserCart(mockItem));
    });
  });

  test("shows 'Add Again!' on button when item exists in the cart", () => {
    mockSelector.mockReturnValue([{ isActive: true, cart: [mockItem] }]);
    const store = mockStore({ user: { userData: [] } });

    const { getByTestId } = render(
      <Provider store={store}>
        <ProductCard item={mockItem} />
      </Provider>
    );

    expect(getByTestId(`buy-now-button-${mockItem.id}`).textContent).toBe("Add Again!");
  });

});

const mockItem = {
  id: 1,
  title: "Test Product",
  images: ["test-image.jpg"],
  description: "This is a test product",
  price: 99.99,
  itemExist: false,
};
