import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styledMainTheme from "../../stylesUtils/styledMainTheme";
import Header from "../Header/Header";
import Login from "../LogIn/LogIn";
import ModalError from "../Modal/ModalError";
import SignUp from "../SignUp/SignUp";
import "./App.css";

import useStorage from "../../hooks/useStorage";
import { useAppSelector } from "../../store/hooks";

const App = () => {
  const { getToken } = useStorage();

  useEffect(() => {
    getToken();
  }, [getToken]);

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
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
