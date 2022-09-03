import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { wrappedRender } from "../../test-utils/WrappedRender";
import Login from "./LogIn";

const mockUseUsers = {
  logIn: jest.fn().mockResolvedValue(true),
};

jest.mock("../../hooks/useUser", () => () => mockUseUsers);

describe("Given a FormRegister function", () => {
  describe("When it is called", () => {
    test("Then it should show a h2 with Join to hte snkrsrvws community", async () => {
      wrappedRender(<Login />);

      const heading = screen.getByRole("heading", {
        name: "Join the SnkrsRvws community",
      });

      expect(heading).toBeInTheDocument();
    });

    test("And if the user click on the Submit button it should call login function", async () => {
      const users = {
        userName: "Adrian",
        password: "Adrian",
      };

      wrappedRender(<Login />);

      const inputUserName = screen.getByLabelText("User Name");
      await userEvent.type(inputUserName, users.userName);

      const inputPassword = screen.getByLabelText("Password");
      await userEvent.type(inputPassword, users.password);

      const button = screen.getByRole("button", { name: "Login" });
      userEvent.click(button);

      expect(mockUseUsers.logIn).toHaveBeenCalled();
    });

    test("And if the user don't type  and click on the Submit button it shouldn't call the login function", async () => {
      wrappedRender(<Login />);

      const button = screen.getByRole("button", { name: "Login" });
      userEvent.click(button);

      expect(mockUseUsers.logIn).not.toHaveBeenCalled();
    });

    test("And if the user write in the Password input it should show it", async () => {
      wrappedRender(<Login />);

      const type = "Esta";

      const input = screen.getByLabelText("Password");
      await userEvent.type(input, type);

      expect(input).toHaveValue("Esta");
    });

    test("And if the user write in the UserName input it should show", async () => {
      const type = "Esta";

      wrappedRender(<Login />);

      const input = screen.getByLabelText("User Name");

      await userEvent.type(input, type);

      expect(input).toHaveValue("Esta");
    });
  });
});
