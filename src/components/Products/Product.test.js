// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import Products from "./Products";

// describe("Products component", () => {
//   it("clears the selected category when 'Show All' is clicked in the dropdown", () => {
//     render(<Products />);
    
//     const dropdownButton = screen.getByRole("button", { name: "All Products ▼" });
//     fireEvent.click(dropdownButton);

//     const showAllOption = screen.getByRole("option", { name: "Show All" });
//     fireEvent.click(showAllOption);

//     const selectedCategory = screen.getByText("All Products");
//     expect(selectedCategory).toBeInTheDocument();
//   });
// });
import React from "react";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import Products from "./Products";

jest.mock("node-fetch"); // Mocking fetch, you may need to install the "node-fetch" package

describe("Products component", () => {
  const mockCategories = [
    "laptops",
    "smartphones",
    // ... add more mock categories as needed
  ];

  const mockProducts = [
    {
      id: 6,
      title: "MacBook Pro",
      description: "MacBook Pro 2021 with mini-LED display may launch between September, November",
      price: 1749,
      discountPercentage: 11.02,
      rating: 4.57,
      stock: 83,
      brand: "Apple",
      category: "laptops",
      thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
      images: [
        "https://i.dummyjson.com/data/products/6/1.png",
        "https://i.dummyjson.com/data/products/6/2.jpg",
        "https://i.dummyjson.com/data/products/6/3.png",
        "https://i.dummyjson.com/data/products/6/4.jpg",
      ],
    },
    {
      id: 7,
      title: "Samsung Galaxy Book",
      description: "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
      price: 1499,
      discountPercentage: 4.15,
      rating: 4.25,
      stock: 50,
      brand: "Samsung",
      category: "laptops",
      thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/7/1.jpg",
        "https://i.dummyjson.com/data/products/7/2.jpg",
        "https://i.dummyjson.com/data/products/7/3.jpg",
        "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
      ],
    },
    // ... add more mock products as needed
  ];

  beforeAll(() => {
    // Mocking the fetch response for categories
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCategories),
    });
  });

  beforeEach(() => {
    // Mocking the fetch response for products
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ products: mockProducts }),
    });

    render(<Products />);
  });

  it("renders Products component with loading state", () => {
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });


  afterAll(() => {
    global.fetch.mockRestore();
  });




  // Add more test cases as needed

  afterAll(() => {
    // Clean up mock
    global.fetch.mockRestore();
  });
});
