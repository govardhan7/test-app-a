import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("renders copyright text", () => {
    render(<Footer />);
    
    const copyrightText = screen.getByText(/Copyright © Sabka Bazaar Pvt Ltd/i);
    expect(copyrightText).toBeInTheDocument();
  });


});
