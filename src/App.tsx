import React from "react";
import SignUp from "./components/SignUp/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import styledMainTheme from "./stylesUtils/styledMainTheme";
import Login from "./components/LogIn/LogIn";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <ThemeProvider theme={styledMainTheme}>
      <Header />
      <div className="mainn-container">
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
