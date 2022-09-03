import { act } from "react-dom/test-utils";
import { UiModal } from "../../store/features/uiModal/model/uiModal";
import { loginActionCreator } from "../../store/features/users/usersSlice";
import mockLocalStorage from "../../test-utils/mocks/localStorageMock";
import { screen, waitFor, wrappedRender } from "../../test-utils/WrappedRender";
import App from "./App";

let mockAppSelector: UiModal = {
  isLoading: false,
  modal: {
    isOpen: true,
    text: "Testing error",
    type: "error",
  },
};
const mockDispatch = jest.fn();

jest.mock("../../store/hooks", () => ({
  ...jest.requireActual("../../store/hooks"),
  useAppSelector: () => mockAppSelector,
  useAppDispatch: () => mockDispatch,
}));

jest.mock("../../store/features/users/usersSlice", () => ({
  ...jest.requireActual("../../store/features/users/usersSlice"),
  loginActionCreator: () => jest.fn(),
}));

const mockJwt = jest.fn();
jest.mock("jwt-decode", () => () => mockJwt);

jest.mock("../../store/hooks", () => ({
  ...jest.requireActual("../../store/hooks"),
  useAppSelector: () => mockAppSelector,
}));

describe("Given an App component", () => {
  beforeEach(() => jest.clearAllMocks());
  describe("When it is called", () => {
    test("Then it should show the text property if the isOpen property is true", () => {
      wrappedRender(<App />);

      const Error = screen.getByText("Testing error");

      expect(Error).toBeInTheDocument();
    });

    test("Then it should ht text Loading if is Loading propety is true", () => {
      mockAppSelector = {
        isLoading: true,
        modal: {
          isOpen: false,
          text: "Testing error",
          type: "error",
        },
      };

      wrappedRender(<App />);

      const Error = screen.getByText("Loading...");

      expect(Error).toBeInTheDocument();
    });
  });
});
