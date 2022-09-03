import { renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { wrappedRender } from "../../test-utils/WrappedRender";
import Header from "./Header";

const mockUserState = {
  id: "",
};

jest.mock("../../store/hooks", () => ({
  ...jest.requireActual("../../store/hooks"),
  useAppSelector: () => mockUserState,
}));

const mockuseUser = { logOut: jest.fn() };

jest.mock("../../hooks/useUser", () => () => mockuseUser);

describe("Given a Header function", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("When it is called", () => {
    test("Then it should show a heading with SnkrsRvws as text", () => {
      wrappedRender(<Header />);
      const heading = screen.getByRole("heading", {
        name: "SnkrsRvws",
      });

      expect(heading).toBeInTheDocument();
    });
    test("Then it should show a link with Home as text content", () => {
      wrappedRender(<Header />);
      const heading = screen.getByRole("link", {
        name: "Home",
      });

      expect(heading).toBeInTheDocument();
    });

    test("Then it should show a log in and sign up links if the id of the user state is empty", () => {
      wrappedRender(<Header />);
      const login = screen.getByRole("link", {
        name: "Log in",
      });

      const signup = screen.getByRole("link", {
        name: "Sign up",
      });

      expect(login).toBeInTheDocument();
      expect(signup).toBeInTheDocument();
    });

    test("Then it should show a Your Reviews, Create Review and log out links if the id of the user state is full", () => {
      mockUserState.id = "123456789012";
      wrappedRender(<Header />);
      const yourReviews = screen.getByRole("link", {
        name: "Your Reviews",
      });

      const creatateReviews = screen.getByRole("link", {
        name: "Create Review",
      });

      const logout = screen.getByRole("button", {
        name: "Log out",
      });

      expect(yourReviews).toBeInTheDocument();
      expect(creatateReviews).toBeInTheDocument();
      expect(logout).toBeInTheDocument();
    });

    test("Then if the burger icon isn't clicked it should change the click state to true", () => {
      wrappedRender(<Header />);

      const { result: current } = renderHook(() => useState(true));
      const burger = screen.getByTestId("burgerIcon");
      userEvent.click(burger);

      expect(current.current[0]).toBe(true);
    });

    test("Then if Logout button is clicked it should call the use users's log out function", () => {
      mockUserState.id = "123456789012";
      wrappedRender(<Header />);

      const logout = screen.getByRole("button", {
        name: "Log out",
      });

      userEvent.click(logout);

      expect(mockuseUser.logOut).toHaveBeenCalled();
    });
  });
});
