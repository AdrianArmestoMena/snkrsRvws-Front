import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./model/User";

const initialState: User = {
  id: "",
  userName: "",
  token: "",
};

export const usersSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => action.payload,
  },
});

export const usersReducer = usersSlice.reducer;

export const { logIn } = usersSlice.actions;

export const loginReducer = usersSlice.reducer;
