import React from "react";
import SignUp from "./components/SignUp/SignUp";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import styledMainTheme from "./stylesUtils/styledMainTheme";

const App = () => {
  return (
    <ThemeProvider theme={styledMainTheme}>
      <div className="App">
        <header className="App-header">
          <p>SnkrsRvws</p>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/signUp" />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
