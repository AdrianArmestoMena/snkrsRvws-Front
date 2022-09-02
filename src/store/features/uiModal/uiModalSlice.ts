import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uiModal } from "./model/uiModal";

const initialState: uiModal = {
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
    loading: (state: uiModal, action: PayloadAction<uiModal>) => {
      return {
        isLoading: true,
        modal: {
          isOpen: true,
          text: "Loading...",
          type: "loading",
        },
      };
    },
    closeLoading: (state: uiModal, action: PayloadAction<uiModal>) => {
      return {
        ...state,
        isLoading: false,
      };
    },
    throwMessageError: (state: uiModal, action: PayloadAction<uiModal>) => {
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
