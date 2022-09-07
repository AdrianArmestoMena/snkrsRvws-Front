import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styledMainTheme from "../../stylesUtils/styledMainTheme";
import Header from "../Header/Header";
import ModalError from "../Modal/ModalError";
import "./App.css";
import useStorage from "../../hooks/useStorage";
import { useAppSelector } from "../../store/hooks";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import ReviewFormPage from "../../pages/ReviewFormPage/ReviewFormPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import YourReviewsPage from "../../pages/YourReviewsPage/YourReviewsPage";

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
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create-review" element={<ReviewFormPage />} />
          <Route path="/your-reviews" element={<YourReviewsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
