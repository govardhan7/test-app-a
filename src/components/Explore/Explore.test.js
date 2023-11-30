import React from "react";
import { render, screen } from "@testing-library/react";
import Explore from "./Explore";
import { BrowserRouter as Router } from "react-router-dom";

// Mock data for testing
const mockCategory = {
  id: 1,
  title: "Test Category",
  description: "Test category description",
  brand: "Test Brand",
  images: ["test-image.jpg"],
};

describe("Explore Component", () => {
  test("renders Explore component with correct content", () => {
    render(
      <Router>
        <Explore category={mockCategory} left={1} />
      </Router>
    );

    // Assertions based on your component structure
    expect(screen.getByRole("heading", { name: /Test Category/i })).toBeInTheDocument();
    expect(screen.getByText(/Test category description/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore Test Brand/i })).toBeInTheDocument();
  });

  test("renders Explore component with correct image", () => {
    render(
      <Router>
        <Explore category={mockCategory} left={1} />
      </Router>
    );

    // Assertions for the image
    const image = screen.getByAltText(/category Test Category/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  // Add more test cases as needed
});
