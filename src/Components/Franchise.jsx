import React, { useState, useEffect } from "react";
import { fs } from "../Config/Config";
import "./Adminstyle/tables.css";

const Franchises = () => {
  const [franchises, setFranchises] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    contact: "",
    city: "",
    district: "",
    zipCode: "",
    managerEmail: ""
  });

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const franchisesRef = fs.collection("franchise");
        const snapshot = await franchisesRef.get();
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFranchises(data);
      }
      catch (error) {
        console.error("Error fetching franchises:", error.message);
      }
    };

    fetchFranchises();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fs.collection("franchise").doc(id).delete();
      alert("Franchise deleted successfully!");
    }
    catch (error) {
      console.error("Error deleting franchise:", error.message);
    }
  };

  const handleUpdate = (franchise) => {
    setSelectedFranchise(franchise);
    setFormData(franchise);
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitUpdate = async () => {
    try {
      await fs.collection("franchise").doc(selectedFranchise.id).update(formData);
      setShowForm(false);
      alert("Franchise updated successfully!");
    }
    catch (error) {
      console.error("Error updating franchise:", error.message);
    }
  };

  return (
    <div>
      <div className="back">
      <div className="headings">Franchises</div>
        <div className="table-container">
          <table className="table-body">
            <thead className="head">
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Contact</th>
                <th>City</th>
                <th>District</th>
                <th>Zip Code</th>
                <th>Manager Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="body">
              {franchises.map((franchise) => (
                <tr key={franchise.id}>
                  <td>{franchise.name}</td>
                  <td>{franchise.location}</td>
                  <td>{franchise.contact}</td>
                  <td>{franchise.city}</td>
                  <td>{franchise.district}</td>
                  <td>{franchise.zipCode}</td>
                  <td>{franchise.managerEmail}</td>
                  <td>
                    <button className="update-button" onClick={() => handleUpdate(franchise)}>Update</button>
                    <button className="delete-button" onClick={() => handleDelete(franchise.id)}>Delete</button>
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
            <div className='Headings'>Update Franchise</div>
            <form className="formData" onSubmit={(e) => e.preventDefault()}>
              <div className='attribute'>Name: </div>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />

              <div className='attribute'>Location:</div>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />

              <div className='attribute'>Contact: </div>
              <input type="text" name="contact" value={formData.contact} onChange={handleChange} />

              <div className='attribute'>City:</div>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />

              <div className='attribute'>District: </div>
              <input type="text" name="district" value={formData.district} onChange={handleChange} />

              <div className='attribute'>Zip Code:</div>
              <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />

              <div className='attribute'>Manager Email:</div>
              <input type="text" name="managerEmail" value={formData.managerEmail} onChange={handleChange} />

              <button className='edit-btn' onClick={handleSubmitUpdate}>Update Franchise</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Franchises;
