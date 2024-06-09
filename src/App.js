import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminNavbar from "./Components/AdminNavbar";
import FranchiseDetails from "./Components/FranchiseDetails";
import Campaign from "./Components/Campaign";
import Beneficiary from "./Components/Beneficiary";
import ApproveProject from "./Components/ApproveProjects";
import Projects from "./Components/Projects";
import ListVolunteer from "./Components/volunteerList";
import FranchiseLogin from "./Components/FranchiseLogin";
import CompletedProjects from "./Components/CompletedProjects"; 
import CompletedCampaigns from "./Components/CompletedCampaigns";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && <AdminNavbar />}
      <Routes>
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
