import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Dashboard, Auth } from "@/layouts";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./feature/authSlice";

const getToken = () => localStorage.getItem("token");

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loginUserSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(getUserProfile());
    } else {
      // Redirect to sign-in if no token
      navigate("/auth/sign-in");
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if (loginUserSuccess) {
  //     if (user.role === "staff") {
  //       navigate("/dashboard/take-attendance");
  //     } else if (user.role === "faculty") {
  //       navigate("/dashboard/home");
  //     }
  //   }
  // }, [loginUserSuccess, user, navigate]);

  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
