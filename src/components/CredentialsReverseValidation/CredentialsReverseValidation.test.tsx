import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import CredentialsReverseValidation from "./CredentialsReverseValidation";

let mockUnloggedUser: string;

jest.mock("../../store/hooks", () => ({
  ...jest.requireActual("../../store/hooks"),
  useAppSelector: () => mockUnloggedUser,
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Given a CredentialsReverseValidation component", () => {
  beforeEach(() => jest.clearAllMocks());
  describe("When its invoked and the user is not logged in", () => {
    test("Then it should call the navigate function", () => {
      mockUnloggedUser = "12345";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CredentialsReverseValidation>
              <h1>Log in</h1>
            </CredentialsReverseValidation>
          </BrowserRouter>
        </Provider>
      );

      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  describe("When its invoked and the user is  logged in", () => {
    test("Then it should call the navigate function", () => {
      mockUnloggedUser = "";

      render(
        <Provider store={store}>
          <BrowserRouter>
            <CredentialsReverseValidation>
              <h1>Login</h1>
            </CredentialsReverseValidation>
          </BrowserRouter>
        </Provider>
      );

      const headingExpected = screen.getByRole("heading", { name: "Login" });

      expect(headingExpected).toBeInTheDocument();
    });
  });
});
