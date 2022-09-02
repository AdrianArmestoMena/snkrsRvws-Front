import { UiModal } from "./model/uiModal";
import {
  closeLoadingActionCreator,
  loadingUiActionCreator,
  throwMessageErrorActionCreator,
  uiModalReducer,
} from "./uiModalSlice";

describe("Given a uiModal reducer function", () => {
  const initialState: UiModal = {
    isLoading: false,
    modal: {
      isOpen: false,
      text: "",
      type: "error",
    },
  };

  describe("When it is called with an undefined action and an unknow state", () => {
    test("Then it should return the initial state", () => {
      const unknownAction = { type: "unknown" };

      expect(uiModalReducer(undefined, unknownAction)).toEqual(initialState);
    });

    describe("When it is called with a loading action", () => {
      test("Then it should return the uiState loading on the action payload", () => {
        const uiStateloading: UiModal = {
          isLoading: true,
          modal: {
            isOpen: true,
            text: "Loading...",
            type: "loading",
          },
        };

        const actualUser = uiModalReducer(
          undefined,
          loadingUiActionCreator(uiStateloading)
        );

        expect(actualUser).toStrictEqual(uiStateloading);
      });

      describe("When it is called with a close laoding action", () => {
        test("Then it should return the uiState loading on the action payload", () => {
          const uiStateloading: UiModal = {
            isLoading: false,
            modal: {
              isOpen: false,
              text: "",
              type: "error",
            },
          };

          const actualUser = uiModalReducer(
            undefined,
            closeLoadingActionCreator(uiStateloading)
          );

          expect(actualUser).toStrictEqual(uiStateloading);
        });
      });

      describe("When it is called with a throw error action", () => {
        test("Then it should return the uiState loading on the action payload", () => {
          const uiStateloading: UiModal = {
            isLoading: false,
            modal: {
              isOpen: true,
              text: "Something went wrong",
              type: "error",
            },
          };

          const actualUser = uiModalReducer(
            undefined,
            throwMessageErrorActionCreator(uiStateloading)
          );

          expect(actualUser).toStrictEqual(uiStateloading);
        });
      });
    });
  });
});
