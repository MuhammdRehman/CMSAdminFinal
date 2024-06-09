import React, { useEffect, useState } from "react";
import { fs, useFirebaseAuth } from "../Config/Config"; 

import "./Adminstyle/tables.css";

const Beneficiary = () => {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    dob: "",
    status: "Orphan",
    educationLevel: "",
    skillsAcquired: "",
    healthStatus: "",
  });

  const { currentUser } = useFirebaseAuth();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [selectedBeneficiaryIndex, setSelectedBeneficiaryIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        if (currentUser) {
          const beneficiaryDocRef = fs.collection("beneficiaries").doc(currentUser.uid);
          const beneficiaryDoc = await beneficiaryDocRef.get();

          if (beneficiaryDoc.exists) {
            const data = beneficiaryDoc.data();
            setBeneficiaries(data.beneficiaryData);
          }
        }
      } catch (error) {
        console.error("Error fetching beneficiary data:", error);
      }
    };

    fetchBeneficiaries();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const beneficiaryDocRef = fs.collection("beneficiaries").doc(currentUser.uid);
      const beneficiaryDoc = await beneficiaryDocRef.get();

      if (beneficiaryDoc.exists) {
        let updatedBeneficiaries = [...beneficiaries];

        if (selectedBeneficiaryIndex !== null) {
          updatedBeneficiaries[selectedBeneficiaryIndex] = formData;
        }
        else {
          updatedBeneficiaries = [...beneficiaries, formData];
        }

        await beneficiaryDocRef.update({
          beneficiaryData: updatedBeneficiaries,
        });

        setBeneficiaries(updatedBeneficiaries);
      }
      else {
        await beneficiaryDocRef.set({
          beneficiaryData: [formData],
        });
        setBeneficiaries([formData]);
      }

      setFormData({
        name: "",
        cnic: "",
        dob: "",
        status: "Orphan",
        educationLevel: "",
        skillsAcquired: "",
        healthStatus: "",
      });
      setSelectedBeneficiary(null);
      setSelectedBeneficiaryIndex(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating beneficiary:", error.message);
    }
  };

  const handleUpdate = (beneficiary, index) => {
    setSelectedBeneficiary(beneficiary);
    setSelectedBeneficiaryIndex(index);
    setFormData(beneficiary);
    setShowForm(true);
  };

  const handleDelete = async (index) => {
    try {
      const beneficiaryDocRef = fs.collection("beneficiaries").doc(currentUser.uid);
      const beneficiaryDoc = await beneficiaryDocRef.get();
      if (beneficiaryDoc.exists) {
        const updatedBeneficiaries = [...beneficiaries];
        updatedBeneficiaries.splice(index, 1);
        await beneficiaryDocRef.update({
          beneficiaryData: updatedBeneficiaries,
        });
        setBeneficiaries(updatedBeneficiaries); 
      }
    }
    catch (error) {
      console.error("Error deleting beneficiary:", error.message);
    }
  };

  const filteredBeneficiaries = filter === "All"
    ? beneficiaries
    : beneficiaries.filter(b => b.status === filter);

  return (
    <div>
      <div className="back">
        <div className="headings">Beneficiaries</div>
        
        <div className="filter-options">
          {["All", "Orphan", "Widow", "Other"].map(option => (
            <div
              key={option}
              className={`filter-option ${filter === option ? 'active' : ''}`}
              onClick={() => setFilter(option)}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="table-container">
          <table className="table-body">
            <thead className="head">
              <tr>
                <th>Name</th>
                <th>CNIC</th>
                <th>DOB</th>
                <th>Status</th>
                <th>Education Level</th>
                <th>Skills Acquired</th>
                <th>Health Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="body">
              {filteredBeneficiaries.map((beneficiary, index) => (
                <tr key={index}>
                  <td>{beneficiary.name}</td>
                  <td>{beneficiary.cnic}</td>
                  <td>{beneficiary.dob}</td>
                  <td>{beneficiary.status}</td>
                  <td>{beneficiary.educationLevel}</td>
                  <td>{beneficiary.skillsAcquired}</td>
                  <td>{beneficiary.healthStatus}</td>
                  <td>
                    <button className="update-button" onClick={() => handleUpdate(beneficiary, index)}>Update</button>
                    <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div className="placeForm">
        <button className="tooglebutton" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel Enrollment" : "Enroll Beneficiary"}
        </button>
        {showForm && (
          <div className="form">
            <div className="Headings">{selectedBeneficiary ? "Update Beneficiary" : "Enroll Beneficiary"}</div>
            <form className="formData" onSubmit={handleSubmit}>
              <div className="attribute">Name: </div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />

              <div className="attribute">CNIC:</div>
              <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} required />

              <div className="attribute">DOB: </div>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} />

              <div className="attribute">Status: </div>
              <select className="accType" name="status" value={formData.status} onChange={handleChange}>
                <option className="selection" value="Orphan">Orphan</option>
                <option className="selection" value="Widow">Widow</option>
                <option className="selection" value="Other">Other</option>
              </select>

              <div className="attribute">Education Level :</div>
              <input type="text" name="educationLevel" value={formData.educationLevel} onChange={handleChange} required />

              <div className="attribute">Skills Acquired : </div>
              <input type="text" name="skillsAcquired" value={formData.skillsAcquired} onChange={handleChange} />

              <div className="attribute">Health Status: </div>
              <input type="text" name="healthStatus" value={formData.healthStatus} onChange={handleChange} />
              <br />

              {selectedBeneficiary ? (
                <button className="edit-btn" onClick={handleSubmit}>Update Beneficiary</button>
              ) : (
                <button className="edit-btn" type="submit">Add Beneficiary</button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Beneficiary;
