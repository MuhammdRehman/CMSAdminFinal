import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, fs } from '../Config/Config';

import "./Adminstyle//adminPage.css";

const FranchiseLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try { 
      const franchiseSnapshot = await fs.collection('franchise').where('managerEmail', '==', email).get();
      if (!franchiseSnapshot.empty) {
        
        const userCredential = await auth.signInWithEmailAndPassword(email, password); 
        console.log('Logged in user ID:', userCredential.user.uid);

        alert("Login successful!"); 
        navigate("/franchiseInformation");  
      }
      else { 
        alert('Email not found or incorrect');
      }
    }
    catch (error) {
      console.error('Error signing in:', error.message);
      alert('Error signing in. Please try again.');
    }
  };

  return (
    <div className="form-container"> 
      <div className="signup">Franchise Login</div> 
      <p className="franchise-text">Enter the Registered <b>Franchise Account's Email</b> with password </p>

      <form className="form-data" onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter Account's Email" name="email" value={formData.email} onChange={handleChange} required />
        <input type="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      
    </div>
  );
};

export default FranchiseLogin;
