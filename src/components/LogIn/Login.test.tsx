import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "./LogIn";

const mockUseUsers = {
  logIn: jest.fn(),
};
jest.mock("../../hooks/useUser", () => () => mockUseUsers);

describe("Given a FormRegister function", () => {
  describe("When it is called", () => {
    test("Then it should show a h2 with Join to hte snkrsrvws community", async () => {
      render(<Login />);

      const heading = screen.getByRole("heading", {
        name: "Join the SnkrsRvws communty",
      });

      expect(heading).toBeInTheDocument();
    });

    test("And if the user click on the Submit button it should call setUser Function", async () => {
      const users = {
        userName: "Adrian",

        password: "Adrian",
      };

      render(<Login />);

      const inputUserName = screen.getByLabelText("User Name");
      await userEvent.type(inputUserName, users.userName);

      const inputPassword = screen.getByLabelText("Password");
      await userEvent.type(inputPassword, users.password);

      const button = screen.getByRole("button", { name: "Login" });

      await userEvent.click(button);

      expect(mockUseUsers.logIn).toHaveBeenCalled();
    });

    test("And if the user type wrong data and click on the Submit button it should call setUser Function", async () => {
      const users = {
        userName: "",
        password: "",
      };

      const changeUsers = jest.fn();
      React.useState = jest.fn().mockReturnValue([users, changeUsers]);

      render(<Login />);

      const button = screen.getByRole("button", { name: "Login" });
      await userEvent.click(button);

      expect(mockUseUsers.logIn).not.toHaveBeenCalled();
    });

    test("And if the user write in the Password input it should show", async () => {
      const users = {};

      const changeUsers = jest.fn();

      React.useState = jest.fn().mockReturnValue([users, changeUsers]);

      const type = "Esta";

      render(<Login />);

      const input = screen.getByLabelText("Password");

      await userEvent.type(input, type);

      expect(changeUsers).toHaveBeenCalled();
    });

    test("And if the user write in the UserName input it should show", async () => {
      const users = {};

      const changeUsers = jest.fn();

      React.useState = jest.fn().mockReturnValue([users, changeUsers]);

      const type = "Esta";

      render(<Login />);

      const input = screen.getByLabelText("User Name");

      await userEvent.type(input, type);

      expect(changeUsers).toHaveBeenCalled();
    });
  });
});
