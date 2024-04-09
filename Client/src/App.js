import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CardQuestionPage,
  Demo,
  Home,
  Profile,
  SignIn,
  SignUp,
} from "./Scenes";
import { Navbar } from "./Components";
import { userSelector } from "./Redux/Reducers/userReducer.js";

const App = () => {
  const { user } = useSelector(userSelector) || null;
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/SignIn" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Demo />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/purpose"
          element={
            user ? (
              user?.isPurposeVisited === false ? (
                <CardQuestionPage />
              ) : (
                <>
                  <Navbar />
                  <Home />
                </>
              )
            ) : (
              <Navigate to="/SignIn" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
