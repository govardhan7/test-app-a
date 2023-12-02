import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

jest.mock("../Banner/Banner", () => () => <div className="mocked-banner" />);

jest.mock("../Explore/Explore", () => ({ category, left }) => (
  <div className="mocked-explore" key={category.id}>
    <span className="category-title">{category.title}</span>
    <span className="left-value">{left}</span>
  </div>
));


global.scrollTo = jest.fn();


describe("Home Component", () => {
    test("renders Home component with Banner and Explore components", async () => {
        render(
          <MemoryRouter>
            <Home />
          </MemoryRouter>
        );
      
        const banner = document.querySelector(".mocked-banner");
        const exploreComponents = document.querySelectorAll(".mocked-explore");
      
        expect(banner).toBeInTheDocument();
        expect(exploreComponents.length).toBe(0);
      });
      

  test("fetches and renders category data", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ products: [{ id: 1, title: "Test Category" }] }),
      })
    );

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const testCategoryElement = screen.getByText(/Test Category/i);
      expect(testCategoryElement).toBeInTheDocument();
    });

    global.fetch.mockClear();
  });

});
