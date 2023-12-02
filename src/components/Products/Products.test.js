import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Products from "./Products";
import fetchMock from "jest-fetch-mock"; 

fetchMock.enableMocks();


global.scrollTo = jest.fn();

describe("Products component", () => {
  const mockCategories = ["laptops", "smartphones"];
  const mockProducts = [
    // ... mock product data
  ];
  const mockStore = configureStore();
  const store = mockStore({ user: { userData: [] } });

  beforeEach(() => {
    fetchMock.resetMocks(); 

    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCategories),
    });

    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ products: mockProducts }),
    });

    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );
  });

  it("renders Products component with loading state", () => {
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders product cards after data is fetched", async () => {
    await waitFor(() => {
      const productCards = screen.getAllByRole("article");
      expect(productCards.length).toBe(mockProducts.length);
    });
  });

  it("shows 'No data available' when no products are fetched", async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ products: [] }),
    });

    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    await waitFor(() => {
      const noDataElement = screen.getByText("No data available");
      expect(noDataElement).toBeInTheDocument();
    });
  });

  it("correctly filters products based on category selection", async () => {
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ products: [{ "id": 1, "title": "iPhone 9", "description": "An apple mobile which is nothing like apple", "price": 549, "discountPercentage": 12.96, "rating": 4.69, "stock": 94, "brand": "Apple", "category": "smartphones", "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg", "images": ["https://i.dummyjson.com/data/products/1/1.jpg", "https://i.dummyjson.com/data/products/1/2.jpg", "https://i.dummyjson.com/data/products/1/3.jpg", "https://i.dummyjson.com/data/products/1/4.jpg", "https://i.dummyjson.com/data/products/1/thumbnail.jpg"] }] }),
    });

    const categoryButton = screen.getByLabelText("Show laptops Products");
    fireEvent.click(categoryButton);

    await waitFor(() => {
      const productCards = screen.getAllByRole("article");
      expect(productCards.length).toBe(7);
    });
  });






  afterAll(() => {
    fetchMock.disableMocks();
  });

});
