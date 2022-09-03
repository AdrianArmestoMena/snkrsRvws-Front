import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UiModal } from "./model/uiModal";

const initialState: UiModal = {
  isLoading: false,
  modal: {
    isOpen: false,
    text: "",
    type: "error",
  },
};

export const uiModalsSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loading: (state: UiModal) => ({
      ...state,
      isLoading: true,
    }),
    closeLoading: (state: UiModal) => ({
      ...state,
      isLoading: false,
    }),
    throwMessageError: (state: UiModal, action: PayloadAction<string>) => ({
      ...state,
      modal: {
        isOpen: true,
        text: action.payload,
        type: "error",
      },
    }),
    closeAll: (state: UiModal) => ({
      isLoading: false,
      modal: {
        isOpen: false,
        text: "",
        type: "",
      },
    }),
  },
});

export const usersReducer = uiModalsSlice.reducer;

export const {
  loading: loadingUiActionCreator,
  closeLoading: closeLoadingActionCreator,
  throwMessageError: throwMessageErrorActionCreator,
  closeAll: closeAllActionCreator,
} = uiModalsSlice.actions;

export const uiModalReducer = uiModalsSlice.reducer;
