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
    loading: (state: UiModal, action: PayloadAction<UiModal>) => {
      return {
        isLoading: true,
        modal: {
          isOpen: true,
          text: "Loading...",
          type: "loading",
        },
      };
    },
    closeLoading: (state: UiModal, action: PayloadAction<UiModal>) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    throwMessageError: (state: UiModal, action: PayloadAction<UiModal>) => {
      return {
        ...state,
        modal: {
          isOpen: true,
          text: "Something went wrong",
          type: "error",
        },
      };
    },
  },
});

export const usersReducer = uiModalsSlice.reducer;

export const {
  loading: loadingUiActionCreator,
  closeLoading: closeLoadingActionCreator,
  throwMessageError: throwMessageErrorActionCreator,
} = uiModalsSlice.actions;

export const uiModalReducer = uiModalsSlice.reducer;
