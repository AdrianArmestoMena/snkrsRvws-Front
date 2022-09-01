import React from "react";
import SignUp from "./components/SignUp/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import styledMainTheme from "./stylesUtils/styledMainTheme";
import Login from "./components/LogIn/LogIn";

const App = () => {
  return (
    <ThemeProvider theme={styledMainTheme}>
      <>
        <header className="App-header">
          <p>SnkrsRvws</p>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<SignUp />} />
        </Routes>
      </>
    </ThemeProvider>
  );
};

export default App;
