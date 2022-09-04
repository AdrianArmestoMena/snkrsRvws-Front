import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./model/User";

const initialState: User = {
  id: "",
  userName: "",
};

export const usersSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => action.payload,
    logOut: () => initialState,
  },
});

export const usersReducer = usersSlice.reducer;

export const { logIn: loginActionCreator, logOut: logOutActionCreator } =
  usersSlice.actions;

export const loginReducer = usersSlice.reducer;
