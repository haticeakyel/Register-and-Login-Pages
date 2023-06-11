import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from 'react';
import Login from "../components/Login";
import Register from "./Register";

const RouterPage = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterPage;
