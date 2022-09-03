import { UiModal } from "./model/uiModal";
import {
  closeAllActionCreator,
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
            isOpen: false,
            text: "",
            type: "error",
          },
        };

        const actualUser = uiModalReducer(undefined, loadingUiActionCreator());

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
            closeLoadingActionCreator()
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
              text: "Error en el test",
              type: "error",
            },
          };

          const actualUser = uiModalReducer(
            undefined,
            throwMessageErrorActionCreator("Error en el test")
          );

          expect(actualUser).toStrictEqual(uiStateloading);
        });

        describe("When it is called with a close all action", () => {
          test("Then it should return the loadiing proprty false and isOpen false to", () => {
            const uiStateCloseAll: UiModal = {
              isLoading: false,
              modal: {
                isOpen: false,
                text: "",
                type: "",
              },
            };

            const actualUser = uiModalReducer(
              undefined,
              closeAllActionCreator()
            );

            expect(actualUser).toStrictEqual(uiStateCloseAll);
          });
        });
      });
    });
  });
});
