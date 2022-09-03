<<<<<<< Updated upstream:src/components/App/App.tsx
import React from "react";
=======
import React, { useEffect } from "react";
import SignUp from "./components/SignUp/SignUp";
>>>>>>> Stashed changes:src/App.tsx
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "../../store/hooks";
import styledMainTheme from "../../stylesUtils/styledMainTheme";
import Header from "../Header/Header";
import Login from "../LogIn/LogIn";
import ModalError from "../Modal/ModalError";
import SignUp from "../SignUp/SignUp";
import "./App.css";
<<<<<<< Updated upstream:src/components/App/App.tsx
=======
import styledMainTheme from "./stylesUtils/styledMainTheme";
import Login from "./components/LogIn/LogIn";
import Header from "./components/Header/Header";
import ModalError from "./components/Modal/ModalError";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { UserToken } from "./types/User";
import { loginActionCreator } from "./store/features/users/usersSlice";
import jwtDecode from "jwt-decode";
>>>>>>> Stashed changes:src/App.tsx

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
        {isOpen && <ModalError type={type} text={text} />}
        {isLoading && <ModalError type="" text="Loading..." />}
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
