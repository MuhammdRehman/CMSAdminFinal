import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import "./Adminstyle/tables.css";

const ApproveProject = () => {
  const [proposedProjects, setProposedProjects] = useState([]); 
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = auth.currentUser;
        if (user) { 
          fetchProposedProjects(user.uid);
        }
      }
      catch (error) {
        console.error("Error fetching current user:", error.message);
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchProposedProjects = async (franchiseID) => {
    try {
      const snapshot = await fs.collection("proposedProjects").where("franchiseID", "==", franchiseID).get();
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProposedProjects(projectsData);
    }
    catch (error) {
      console.error("Error fetching proposed projects:", error.message);
    }
  };

  const handleApprove = async (id) => {
    try {
      const projectToApprove = proposedProjects.find(project => project.id === id);

      if (projectToApprove) {
        const { id: _, ...approvedProjectData } = projectToApprove;
        await fs.collection("projects").add(approvedProjectData);
        await fs.collection("proposedProjects").doc(id).delete();
        setProposedProjects(proposedProjects.filter(project => project.id !== id));
      }
    }
    catch (error) {
      console.error("Error approving project:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fs.collection("proposedProjects").doc(id).delete();
      setProposedProjects(proposedProjects.filter(project => project.id !== id));
    }
    catch (error) {
      console.error("Error deleting project:", error.message);
    }
  };

  return (
    <div>
      
      <div className="back">
      <div className="headings">Proposed Projects</div> 

        <div className="table-container">
          <table className="table-body">
            <thead className="head">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Volunteer_ID</th> 
                <th>Start Date</th>
                <th>End Date</th>
                <th>Target Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="body">
              {proposedProjects.map(project => (
                <tr key={project.id}>
                  <td><b>{project.title}</b></td>
                  <td>{project.description}</td>
                  <td><b>{project.volunteerID}</b></td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.targetAmount}</td>
                  <td>{project.status}</td>
                  <td>
                    <button className="approve-button" onClick={() => handleApprove(project.id)}>Approve</button>
                    <button className="delete-button" onClick={() => handleDelete(project.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApproveProject;
