import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import styledMainTheme from "../../stylesUtils/styledMainTheme";
import Header from "../Header/Header";
import ModalError from "../Modal/ModalError";
import "./App.css";
import { useAppSelector } from "../../store/hooks";
import LoginPage from "../../pages/LoginPage/LoginPage";
import SignupPage from "../../pages/SignupPage/SignupPage";
import ReviewFormPage from "../../pages/ReviewFormPage/ReviewFormPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import YourReviewsPage from "../../pages/YourReviewsPage/YourReviewsPage";
import CredentialsValidation from "../CredentialsValidation/CredentialsValidation";
import CredentialsReverseValidation from "../CredentialsReverseValidation/CredentialsReverseValidation";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";

const App = () => {
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
          <Route
            path="/signup"
            element={
              <CredentialsReverseValidation>
                <SignupPage />
              </CredentialsReverseValidation>
            }
          />
          <Route
            path="/review/:id"
            element={
              <CredentialsValidation>
                <DetailsPage />
              </CredentialsValidation>
            }
          />
          <Route
            path="/create-review"
            element={
              <CredentialsValidation>
                <ReviewFormPage />
              </CredentialsValidation>
            }
          />
          <Route
            path="/modify/:reviewId"
            element={
              <CredentialsValidation>
                <ReviewFormPage />
              </CredentialsValidation>
            }
          />
          <Route
            path="/your-reviews"
            element={
              <CredentialsValidation>
                <YourReviewsPage />
              </CredentialsValidation>
            }
          />
          <Route
            path="/login"
            element={
              <CredentialsReverseValidation>
                <LoginPage />
              </CredentialsReverseValidation>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
