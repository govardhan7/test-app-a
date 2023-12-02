import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "./Login";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
global.scrollTo = jest.fn();

describe("Login Component", () => {
  const mockStore = configureStore(); 

  test("renders the login form", () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore({ user: { userData: [] } })}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("submits form with user input and navigates to home page", async () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Provider store={mockStore({ user: { userData: [] } })}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("displays an error message for invalid credentials", async () => {
    render(
      <MemoryRouter>
        <Provider store={mockStore({ user: { userData: [] } })}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });
});
