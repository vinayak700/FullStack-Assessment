import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { CardQuestionPage, Demo, Home, Profile, SignUp } from "./Scenes";
import { Navbar } from "./Components";
import { userSelector } from "./Redux/Reducers/userReducer.js";

const App = () => {
  const { user } = useSelector(userSelector) || null;
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/signUp" />;
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        >
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
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/preference" element={<CardQuestionPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
