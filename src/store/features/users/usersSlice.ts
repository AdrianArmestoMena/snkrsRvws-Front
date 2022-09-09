import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "../../../utils/initialState";
import { User } from "./model/User";

const unLogged: User = {
  id: "",
  userName: "",
};

export const usersSlice = createSlice({
  name: "login",
  initialState: initialState() as User,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => action.payload,
    logOut: () => unLogged,
  },
});

export const usersReducer = usersSlice.reducer;

export const { logIn: loginActionCreator, logOut: logOutActionCreator } =
  usersSlice.actions;

export const loginReducer = usersSlice.reducer;
