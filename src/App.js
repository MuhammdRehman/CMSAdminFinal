import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminCover from "./Components/AdminCover";
import Dashboard from "./Components/Dashboard";
import Franchise from "./Components/Franchise";
import RegisterFranchise from "./Components/regFranchise";
import AdminNavbar from "./Components/AdminNavbar";
import FranchiseDetails from "./Components/FranchiseDetails";
import Beneficiary from "./Components/Beneficiary";
import FranchiseLogin from "./Components/FranchiseLogin";
import ResolveComplains from "./Components/ResolveComplains";

const App = () => {
  const location = useLocation();
  return (
    <>
    {location.pathname !== '/' && location.pathname !== '/managerlogin' && <AdminNavbar />}
      <Routes>
        <Route exact path="/" element={<AdminCover />} />

        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/franchise" element={<Franchise />} />
        <Route exact path="/regFranchise" element={<RegisterFranchise />} />
        <Route exact path="/resolvecomplains" element={<ResolveComplains />} />


        <Route exact path="/" element={<FranchiseLogin />} />
        <Route exact path="/franchiseInformation" element={<FranchiseDetails />} />
        <Route exact path="/beneficiary" element={<Beneficiary />} />


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
