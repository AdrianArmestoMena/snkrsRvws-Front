import React from "react";
import SignUp from "./components/SignUp/SignUp";
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
        <SignUp></SignUp>
      </div>
    </ThemeProvider>
  );
};

export default App;
