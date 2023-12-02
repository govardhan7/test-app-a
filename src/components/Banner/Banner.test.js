import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Banner from "./Banner";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Banner Component", () => {
  test("renders Banner component", () => {
    const { container } = render(<Banner />);
    const bannerComponent = container.getElementsByClassName("bannerContainer")[0];
    expect(bannerComponent).toBeInTheDocument();
  });

  test("renders carousel items", async () => {
    const { getAllByAltText } = render(<Banner />);
    const carouselItems = await waitFor(() => getAllByAltText(/2-independence day deal/i));
    expect(carouselItems.length).toBe(1);
  });

  
  test("simulates click on carousel item", async () => {
    const { getByAltText, container } = render(<Banner />);
    const carouselItem = getByAltText(/2-independence day deal/i);
    fireEvent.click(carouselItem);

    await waitFor(() => {
      const bannerComponent = container.getElementsByClassName("bannerContainer")[0];
      expect(bannerComponent).toBeInTheDocument();
    });
  });
});
