import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AdminNavbar from "./Components/AdminNavbar";
import AdminCover from "./Components/AdminCover";
import RegisterFranchise from "./Components/regFranchise";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/managerlogin' && <AdminNavbar />}
      <Routes>
        <Route exact path="/" element={<AdminCover />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/regFranchise" element={<RegisterFranchise />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
