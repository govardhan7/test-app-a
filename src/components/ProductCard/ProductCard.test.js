import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { addItem } from "../../store/actions/CartActions";

// Mock the useDispatch function
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("ProductCard Component", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  const mockItem = {
    id: 1,
    title: "Test Product",
    images: ["test-image.jpg"],
    description: "This is a test product",
    price: 99.99,
  };

  test("renders ProductCard component with correct content", () => {
    const { getByText, getByAltText } = render(<ProductCard item={mockItem} />);

    expect(getByText(mockItem.title)).toBeInTheDocument();
    expect(getByText(mockItem.description)).toBeInTheDocument();
    expect(getByText(`MRP Rs.${mockItem.price}`)).toBeInTheDocument();
    expect(getByAltText(mockItem.title)).toBeInTheDocument();
  });

});
