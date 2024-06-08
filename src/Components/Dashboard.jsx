import React, { useState, useEffect } from 'react';
import { fs } from '../Config/Config';
import "./Adminstyle/dashboard.css";

const Dashboard = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalFranchises, setTotalFranchises] = useState(0);
  const [projects, setProjects] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [completedCampaigns, setCompletedCampaigns] = useState([]);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalBeneficiaries, setTotalBeneficiaries] = useState(0);

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const franchiseRef = fs.collection('franchise');
        const snapshot = await franchiseRef.get();
        setTotalFranchises(snapshot.size);
      } catch (error) {
        console.error('Error fetching franchises:', error.message);
      }
    };

    const fetchProjects = async () => {
      try {
        const projectsRef = fs.collection('projects');
        const snapshot = await projectsRef.get();
        const projectData = snapshot.docs.map(doc => doc.data());
        setProjects(projectData);
        setTotalProjects(snapshot.size);
      } catch (error) {
        console.error('Error fetching projects:', error.message);
      }
    };

    const fetchCampaigns = async () => {
      try {
        const campaignsRef = fs.collection('campaigns');
        const snapshot = await campaignsRef.get();
        const campaignData = snapshot.docs.map(doc => doc.data());
        setCampaigns(campaignData);
        setTotalCampaigns(snapshot.size);
      } catch (error) {
        console.error('Error fetching campaigns:', error.message);
      }
    };

    const fetchCompletedProjects = async () => {
      try {
        const completedProjectsRef = fs.collection('completedProjects');
        const snapshot = await completedProjectsRef.get();
        const completedProjectsData = snapshot.docs.map(doc => doc.data());
        setCompletedProjects(completedProjectsData);
      } catch (error) {
        console.error('Error fetching completed projects:', error.message);
      }
    };

    const fetchCompletedCampaigns = async () => {
      try {
        const completedCampaignsRef = fs.collection('completedcampaigns');
        const snapshot = await completedCampaignsRef.get();
        const completedCampaignsData = snapshot.docs.map(doc => doc.data());
        setCompletedCampaigns(completedCampaignsData);
      } catch (error) {
        console.error('Error fetching completed campaigns:', error.message);
      }
    };

    const fetchBeneficiaries = async () => {
      try {
        const beneficiariesRef = fs.collection('beneficiaries');
        const snapshot = await beneficiariesRef.get();
        setTotalBeneficiaries(snapshot.size);
      } catch (error) {
        console.error('Error fetching beneficiaries:', error.message);
      }
    };

    const fetchTotalVolunteers = async () => {
      try {
        const volunteersRef = fs.collection('volunteer');
        const snapshot = await volunteersRef.get();
        setTotalVolunteers(snapshot.size);
      } catch (error) {
        console.error('Error fetching total volunteers:', error.message);
      }
    };

    const fetchTotalDonors = async () => {
      try {
        const donorsRef = fs.collection('donors');
        const snapshot = await donorsRef.get();
        setTotalDonors(snapshot.size);
      } catch (error) {
        console.error('Error fetching total donors:', error.message);
      }
    };

    fetchFranchises();
    fetchProjects();
    fetchCampaigns();
    fetchCompletedProjects();
    fetchCompletedCampaigns();
    fetchTotalVolunteers();
    fetchTotalDonors();
    fetchBeneficiaries();
  }, []);

  const projDonations = projects.reduce(
    (total, project) => total + parseInt(project.collectedAmount || 0),
    0
  ) + completedProjects.reduce(
    (total, project) => total + parseInt(project.targetAmount || 0),
    0
  );

  const campDonations = campaigns.reduce(
    (total, campaign) => total + parseInt(campaign.currentAmountRaised || 0),
    0
  );

  const completedProjectsTarget = completedProjects.reduce(
    (total, project) => total + parseInt(project.targetAmount || 0),
    0
  );

  const completedCampaignsTarget = completedCampaigns.reduce(
    (total, campaign) => total + parseInt(campaign.targetAmount || 0),
    0
  );

  const overallDonation = projDonations + campDonations;
  const totalTargetAmount = completedProjectsTarget + completedCampaignsTarget;
  const Donations_tillnow = totalTargetAmount + overallDonation;

  return (
    <div className="dashboard">
      <div className="dashboard-heading">Overall Stats And Figures</div>
      <div className="stats-cards">
        <div className="card">
          <div className="title">Total Organizations/Franchises</div>
          <div className="total">{totalFranchises}</div>
        </div>
        <div className="card">
          <div className="title">Total Projects</div>
          <div className="total">{totalProjects}</div>
        </div>
        <div className="card">
          <div className="title">Total Campaigns</div>
          <div className="total">{totalCampaigns}</div>
        </div>
        <div className="card">
          <div className="title">Total Volunteers</div>
          <div className="total">{totalVolunteers}</div>
        </div>
        <div className="card">
          <div className="title">Total Donors</div>
          <div className="total">{totalDonors}</div>
        </div>
        <div className="card">
          <div className="title">Total Beneficiaries</div>
          <div className="total">{totalBeneficiaries}</div>
        </div>
        <div className="card">
          <div className="title">Donations From Ongoing Projects</div>
          <div className="total">{projDonations}</div>
        </div>
        <div className="card">
          <div className="title">Donations From Ongoing Campaigns</div>
          <div className="total">{campDonations}</div>
        </div>
        <div className="card">
          <div className="title">Overall Donations</div>
          <div className="total">{overallDonation}</div>
        </div>
        <div className="card">
          <div className="title">Donations From Completed Projects</div>
          <div className="total">{completedProjectsTarget}</div>
        </div>
        <div className="card">
          <div className="title">Donations From Completed Campaigns</div>
          <div className="total">{completedCampaignsTarget}</div>
        </div>
        <div className="card">
          <div className="title">Completed Donations Projects/Campaigns</div>
          <div className="total">{totalTargetAmount}</div>
        </div>
        <div className="wide-card">
          <div className="title">Donations Made Till Now</div>
          <div className="total">{Donations_tillnow}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
