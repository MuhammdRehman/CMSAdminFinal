import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AdminNavbar from "./Components/AdminNavbar";
import Franchises from "./Components/Franchise";
import RegisterFranchise from "./Components/regFranchise";
import FranchiseDetails from "./Components/FranchiseDetails";
import Campaign from "./Components/Campaign";
import Beneficiary from "./Components/Beneficiary";
import ApproveProject from "./Components/ApproveProjects";
import Projects from "./Components/Projects";
import ListVolunteer from "./Components/volunteerList";
import AdminCover from "./Components/AdminCover";
import FranchiseLogin from "./Components/FranchiseLogin";
import CompletedProjects from "./Components/CompletedProjects"; 
import CompletedCampaigns from "./Components/CompletedCampaigns";
import ResolveComplains from "./Components/ResolveComplains";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/managerlogin' && <AdminNavbar />}
      <Routes>
        <Route exact path="/" element={<AdminCover />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/franchise" element={<Franchises />} />
        <Route exact path="/regFranchise" element={<RegisterFranchise />} />


        <Route exact path="/managerlogin" element={<FranchiseLogin />} />
        <Route exact path="/franchiseInformation" element={<FranchiseDetails />} />
        <Route exact path="/campaigns" element={<Campaign />} />
        <Route exact path="/beneficiary" element={<Beneficiary />} />
        <Route exact path="/approveprojects" element={<ApproveProject />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/completedprojects" element={<CompletedProjects />} />
        <Route exact path="/completedcampaigns" element={<CompletedCampaigns />} />
        <Route exact path="/volunteerList" element={<ListVolunteer />} />
        <Route exact path="/resolvecomplains" element={<ResolveComplains />} />
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