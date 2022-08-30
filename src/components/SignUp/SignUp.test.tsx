import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import SignUp from "./SignUp";

const mockUseUsers = {
  signUp: jest.fn(),
};
jest.mock("../../hooks/useUser", () => () => mockUseUsers);

describe("Given a FormRegister function", () => {
  describe("When it is called", () => {
    test("Then it should show a h2 with Join to hte snkrsrvws community", async () => {
      render(<SignUp />);

      const heading = screen.getByRole("heading", {
        name: "Join the SnkrsRvws communty",
      });

      expect(heading).toBeInTheDocument();
    });

    test("And if the user click on the Submit button it should call setUser Function", async () => {
      const users = {
        userName: "a",
        email: "a@a",
        password: "a",
        passwordRepeat: "a",
      };

      render(<SignUp />);

      const inputUserName = screen.getByLabelText("User Name");
      await userEvent.type(inputUserName, users.userName);

      const inputPasswordP = screen.getByLabelText("Repeat password");
      await userEvent.type(inputPasswordP, users.passwordRepeat);

      const inputPassword = screen.getByLabelText("Password");
      await userEvent.type(inputPassword, users.password);

      const input = screen.getByLabelText("Email");
      await userEvent.type(input, users.email);

      const button = screen.getByRole("button", { name: "Submit" });

      await userEvent.click(button);

      expect(mockUseUsers.signUp).toHaveBeenCalled();
    });

    test("And if the user type wrong data and click on the Submit button it should call setUser Function", async () => {
      const users = {
        userName: "kk",
        email: "a",
        password: "a",
        passwordRepeat: "c",
      };

      render(<SignUp />);

      const inputUserName = screen.getByLabelText("User Name");
      await userEvent.type(inputUserName, users.userName);

      const inputPasswordP = screen.getByLabelText("Repeat password");
      await userEvent.type(inputPasswordP, users.passwordRepeat);

      const inputPassword = screen.getByLabelText("Password");
      await userEvent.type(inputPassword, users.password);

      const input = screen.getByLabelText("Email");
      await userEvent.type(input, users.email);

      const button = screen.getByRole("button", { name: "Submit" });

      await userEvent.click(button);

      expect(mockUseUsers.signUp).not.toHaveBeenCalled();
    });
    test("And if the user write in the Last name input it should show", async () => {
      const type = "Esta";
      render(<SignUp />);
      const input = screen.getByLabelText("Email");
      await userEvent.type(input, type);

      expect(input).toHaveValue(type);
    });

    test("And if the user write in the Passwords inputs it should show", async () => {
      const users = {};

      const changeUsers = jest.fn();

      React.useState = jest.fn().mockReturnValue([users, changeUsers]);

      const type = "Esta";

      render(<SignUp />);

      const input = screen.getByLabelText("Password");

      await userEvent.type(input, type);

      expect(changeUsers).toHaveBeenCalled();
    });

    test("And if the user write in the Email address input it should show", async () => {
      const users = {};

      const changeUsers = jest.fn();

      React.useState = jest.fn().mockReturnValue([users, changeUsers]);

      const type = "Esta";

      render(<SignUp />);

      const input = screen.getByLabelText("Repeat password");
      await userEvent.type(input, type);

      expect(changeUsers).toHaveBeenCalled();
    });

    test("And if the user write in the UserName input it should show", async () => {
      const users = {};

      const changeUsers = jest.fn();

      React.useState = jest.fn().mockReturnValue([users, changeUsers]);

      const type = "Esta";

      render(<SignUp />);

      const input = screen.getByLabelText("User Name");

      await userEvent.type(input, type);

      expect(changeUsers).toHaveBeenCalled();
    });
  });
});
