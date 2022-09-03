import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "../../store/hooks";
import styledMainTheme from "../../stylesUtils/styledMainTheme";
import Header from "../Header/Header";
import Login from "../LogIn/LogIn";
import ModalError from "../Modal/ModalError";
import SignUp from "../SignUp/SignUp";
import "./App.css";

const App = () => {
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
