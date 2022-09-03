import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import styledMainTheme from "../../stylesUtils/styledMainTheme";
import Header from "../Header/Header";
import Login from "../LogIn/LogIn";
import ModalError from "../Modal/ModalError";
import SignUp from "../SignUp/SignUp";
import "./App.css";
import jwtDecode from "jwt-decode";
import { loginActionCreator } from "../../store/features/users/usersSlice";
import { UserToken } from "../../types/User";

const App = () => {
  const token = localStorage.getItem("token") as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const user: UserToken = jwtDecode(token);
      dispatch(loginActionCreator(user));
    }
  }, [dispatch, token]);

  const {
    isLoading,
    modal: { isOpen, type, text },
  } = useAppSelector((state) => state.uiModal);

  return (
    <ThemeProvider theme={styledMainTheme}>
      <Header />
      <div className="main-container">
        {isLoading && <ModalError type="" text="Loading..." />}
        {isOpen && <ModalError type={type} text={text} />}
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
