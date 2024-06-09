import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import "./Adminstyle/tables.css";
import "./Adminstyle/form.css";

const CompletedCampaigns = () => {
  const [completedCampaigns, setCompletedCampaigns] = useState([]);
  
  useEffect(() => {
    fetchCompletedCampaigns();
  }, []);

  const fetchCompletedCampaigns = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const completedCampaignsRef = fs.collection("completedcampaigns").where("franchiseID", "==", currentUser.uid);
        const snapshot = await completedCampaignsRef.get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompletedCampaigns(data);
      }
    } catch (error) {
      console.error("Error fetching completed campaigns:", error.message);
    }
  };

  return (
    <div>
      <div className="back">
        <div className="headings">Completed Campaigns</div>
        <div className="table-container">
          <table className="table-body">
            <thead className="head">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Target Amount</th> 
              </tr>
            </thead>
            <tbody className="body">
              {completedCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td><b>{campaign.name}</b></td>
                  <td>{campaign.description}</td>
                  <td>{campaign.startDate}</td>
                  <td>{campaign.endDate}</td>
                  <td><b>{campaign.targetAmount}</b></td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedCampaigns;
