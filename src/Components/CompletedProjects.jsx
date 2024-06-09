import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import "./Adminstyle/tables.css";
import "./Adminstyle/form.css";

const CompletedProjects = () => {
  const [completedProjects, setCompletedProjects] = useState([]);
  
  useEffect(() => {
    fetchCompletedProjects();
  }, []);

  const fetchCompletedProjects = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const completedProjectsRef = fs.collection("completedProjects").where("franchiseID", "==", currentUser.uid);
        const snapshot = await completedProjectsRef.get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompletedProjects(data);
      }
    } catch (error) {
      console.error("Error fetching completed projects:", error.message);
    }
  };

  return (
    <div>
      <div className="back">
        <div className="headings">Completed Projects</div>
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
              {completedProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.targetAmount}</td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedProjects;
