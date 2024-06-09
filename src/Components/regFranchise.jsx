import React, { useState } from "react";
import { fs, auth } from "../Config/Config";
import "./Adminstyle/form.css";

const RegisterFranchise = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        location: "",
        contact: "",
        city: "",
        district: "",
        zipCode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const loginAdmin = async () => {
        try {
            await auth.signInWithEmailAndPassword("admin@aisaar.com", "112233");
            console.log("Admin logged in successfully."); 
        } catch (error) {
            console.error("Error logging in admin:", error); 
        }
    };
    
    const handleRegisterFranchise = async (e) => {
        e.preventDefault();
        try {
            const email = formData.name + "@aisaar.com";

            const userCredential = await auth.createUserWithEmailAndPassword(email, formData.password);

            const userId = userCredential.user.uid;

            await fs.collection("franchise").doc(userId).set({ ...formData, managerEmail: email });

            alert("Franchise registered successfully!");

            await loginAdmin();
        }
        catch (error) {
            console.error("Error registering franchise:", error.message);
        }
    };

    return (
        <div className="donor">
            <div className="headings">Register Franchise</div>
            <div className='form'>
                <form className="formData" onSubmit={handleRegisterFranchise}>
                    <div className='attribute'>Name: </div>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                    <div className='attribute'>Password: </div>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                    <div className='attribute'>Location:</div>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required />

                    <div className='attribute'>Contact: </div>
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

                    <div className='attribute'>City:</div>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />

                    <div className='attribute'>District: </div>
                    <input type="text" name="district" value={formData.district} onChange={handleChange} required />

                    <div className='attribute'>Zip Code:</div>
                    <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} required />

                    <button className='edit-btn' type="submit">Register Franchise</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterFranchise;
