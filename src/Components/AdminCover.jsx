import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Adminstyle//adminPage.css";
import { auth } from '../Config/Config';

const AdminCover = () => {
    const [userType, setUserType] = useState("");
    const [password, setPassword] = useState("");
    
    const [ss, setss] = useState("");
    const navigate = useNavigate();

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userType === "Admin" && password === "112233") {

            alert("SucessFully Login !!!!!");
            try {
                await auth.signInWithEmailAndPassword("admin@aisaar.com", password);
                console.log(auth.currentUser);
                navigate("/dashboard");
            }
            catch (error) {
                console.error("Error signing in:", error.message);
                alert("Error signing in. Please try again.");
            }
        }

        else if (userType === "FranchiseManager") {
            alert("Redirecting to Franchise Registered Account !!");
            navigate("/managerlogin");
        }

        else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="form-container">
            <div className="signup">How would you Like to Continue</div>
            <p className="text"></p>

            <form className="form-data" onSubmit={handleSubmit}>
                <div className="radio">
                    <input type="radio" id="Admin" value="Admin" checked={userType === "Admin"} onChange={handleUserTypeChange} />
                    <label for="Admin">Admin</label>
                </div>

                {userType === "Admin" && (
                    <div className="password-input">
                        <input className type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} required />
                    </div>
                )}

                <div className="radio">
                    <input type="radio" id="Franchise" value="FranchiseManager" checked={userType === "FranchiseManager"} onChange={handleUserTypeChange} />
                    <label for="Franchise">Franchise Manager</label>
                </div>

                <button className="sign-in-admin" type="sign">Sign In</button>
            </form>
        </div>
    );
};

export default AdminCover;
