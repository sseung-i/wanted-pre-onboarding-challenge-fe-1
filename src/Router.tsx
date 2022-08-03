import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Main from "./pages/Main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
