import React, { useState, useEffect } from "react";
import { auth, fs } from "../Config/Config";
import "./Adminstyle/tables.css";
import "./Adminstyle/form.css";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    volunteerID: "",
    startDate: "",
    endDate: "",
    targetAmount: "",
    collectedAmount: 0,
    status: "",
    franchiseID: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const projectsRef = fs.collection("projects").where("franchiseID", "==", currentUser.uid);
        const snapshot = await projectsRef.get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(data);
      }
    }
    catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      await fs.collection("projects").doc(id).delete();
      alert("Project deleted successfully!");
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
    }
    catch (error) {
      console.error("Error deleting project:", error.message);
    }
  };

  const handleUpdate = (project) => {
    setSelectedProject(project);
    setFormData({ ...project });
    setShowForm(true);
  };

  const handleSubmitUpdate = async () => {
    try {
      await fs.collection("projects").doc(selectedProject.id).update(formData);
      setShowForm(false);
      alert("Project updated successfully!");
      fetchProjects();
    }
    catch (error) {
      console.error("Error updating project:", error.message);
    }
  };
  const checkCompletedProjects = () => {
    navigate('/completedprojects');
  }

  const check_volunteer = () => {
    navigate('/volunteerList');
  }
  return (
    <div>
      <div className="complete-cont">
        <button className='complete' onClick={checkCompletedProjects}>Check Completed Projects</button>
        <button className='complete' onClick={check_volunteer}>Check Volunteer Info</button>
      </div>
      <div className="back">

        <div className="headings">Projects</div>

        <div className="table-container">
          <table className="table-body">
            <thead className="head">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Volunteer ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Target Amount</th>
                <th>Collected Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="body">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td><b>{project.title}</b></td>
                  <td>{project.description}</td>
                  <td><b>{project.volunteerID}</b></td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.targetAmount}</td>
                  <td>{project.collectedAmount}</td>
                  <td>
                    <div
                      className={`
                        ${project.status === "Active" ? "active" :
                          project.status === "Ongoing" ? "ongoing" : ""}
                      `}
                    >
                      {project.status}
                    </div>
                  </td>
                  <td>
                    <button className="update-button" onClick={() => handleUpdate(project)}>Update</button>
                    <button className="delete-button" onClick={() => handleDelete(project.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="placeForm">
          <div className='form'>
            <div className='Headings'>Update Project's Info</div>
            <form className="formData" onSubmit={(e) => e.preventDefault()}>
              <div className='attribute'>Title: </div>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />

              <div className='attribute'>Description:</div>
              <input type="text" name="description" value={formData.description} onChange={handleChange} required />

              <div className='attribute'>Volunteer ID:</div>
              <input type="text" name="volunteerID" value={formData.volunteerID} readOnly />

              <div className='attribute'>Start Date: </div>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />

              <div className='attribute'>End Date: </div>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

              <div className='attribute'>Target Amount : </div>
              <input type="text" name="targetAmount" value={formData.targetAmount} onChange={handleChange} />

              <div className='attribute'>Franchise ID : </div>
              <input type="text" name="franchiseID" value={formData.franchiseID} readOnly />

              <div className="attribute"> Status: </div>
              <select className="accType" name="status" value={formData.status} onChange={handleChange}>
                <option className="selection" value="Active">Active</option>
                <option className="selection" value="In Progress">In Progress</option>
              </select>
              <br />

              <button className='edit-btn' onClick={handleSubmitUpdate}>Update Project</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
