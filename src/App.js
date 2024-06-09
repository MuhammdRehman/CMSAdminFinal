import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AdminNavbar from "./Components/AdminNavbar";
import AdminCover from "./Components/AdminCover";
import RegisterFranchise from "./Components/regFranchise";
import FranchiseDetails from "./Components/FranchiseDetails";
import FranchiseLogin from "./Components/FranchiseLogin";
import Franchises from "./Components/Franchise";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/managerlogin' && <AdminNavbar />}
      <Routes>
        <Route exact path="/" element={<AdminCover />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/regFranchise" element={<RegisterFranchise />} />
        <Route exact path="/franchise" element={<Franchises />} />

        <Route exact path="/franchiseInformation" element={<FranchiseDetails />} />
        <Route exact path="/managerlogin" element={<FranchiseLogin />} />
        
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
