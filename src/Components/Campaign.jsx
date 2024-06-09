import React, { useEffect, useState } from "react";
import { fs, auth } from "../Config/Config";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
    const navigate = useNavigate();
    const [campaignData, setCampaignData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        targetAmount: "",
        currentAmountRaised: "0",
        status: "active",
        franchiseID: ""
    });

    const [campaigns, setCampaigns] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = () => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setCurrentUser(user.uid);
                }
            });
        };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                if (currentUser) {
                    const campaignsRef = fs.collection("campaigns").where("franchiseID", "==", currentUser);
                    const snapshot = await campaignsRef.get();
                    const campaignData = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setCampaigns(campaignData);
                }
            } catch (error) {
                console.error("Error fetching campaigns:", error.message);
            }
        };

        fetchCampaigns();
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCampaignData({ ...campaignData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requiredFields = ["name", "description", "startDate", "endDate", "targetAmount", "currentAmountRaised"];
            for (const field of requiredFields) {
                if (!campaignData[field]) {
                    throw new Error("All fields are required");
                }
            }

            if (selectedCampaign) {
                await fs.collection("campaigns").doc(selectedCampaign.id).update(campaignData);
                setShowForm(false);
                alert("Campaign updated successfully!");
            } else {
                await fs.collection("campaigns").add({
                    ...campaignData,
                    franchiseID: currentUser,
                });
                setCampaignData({
                    name: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    targetAmount: "",
                    currentAmountRaised: "0",
                    status: "active",
                    franchiseID: currentUser,
                });
                alert("Campaign added successfully!");
            }
            const fetchCampaigns = async () => {
                try {
                    if (currentUser) {
                        const campaignsRef = fs.collection("campaigns").where("franchiseID", "==", currentUser);
                        const snapshot = await campaignsRef.get();
                        const campaignData = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setCampaigns(campaignData);
                    }
                } catch (error) {
                    console.error("Error fetching campaigns:", error.message);
                }
            };
            fetchCampaigns();
        } catch (error) {
            console.error("Error adding/updating campaign:", error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fs.collection("campaigns").doc(id).delete();
            alert("Campaign deleted successfully!");
            const fetchCampaigns = async () => {
                try {
                    if (currentUser) {
                        const campaignsRef = fs.collection("campaigns").where("franchiseID", "==", currentUser);
                        const snapshot = await campaignsRef.get();
                        const campaignData = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setCampaigns(campaignData);
                    }
                } catch (error) {
                    console.error("Error fetching campaigns:", error.message);
                }
            };
            fetchCampaigns();
        } catch (error) {
            console.error("Error deleting campaign:", error.message);
        }
    };

    const handleUpdate = (campaign) => {
        setSelectedCampaign(campaign);
        setCampaignData(campaign);
        setShowForm(true);
    };

    const handleSubmitUpdate = async () => {
        try {
            await fs.collection("campaigns").doc(selectedCampaign.id).update(campaignData);
            setShowForm(false);
            alert("Campaign updated successfully!");
            const fetchCampaigns = async () => {
                try {
                    if (currentUser) {
                        const campaignsRef = fs.collection("campaigns").where("franchiseID", "==", currentUser);
                        const snapshot = await campaignsRef.get();
                        const campaignData = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setCampaigns(campaignData);
                    }
                } catch (error) {
                    console.error("Error fetching campaigns:", error.message);
                }
            };
            fetchCampaigns();
        } catch (error) {
            console.error("Error updating campaign:", error.message);
        }
    };

    const checkCompletedProjects = () => {
        navigate('/completedcampaigns');
    };

    return (
        <div>
            <div className="complete-cont">

                <button className='complete' onClick={checkCompletedProjects}>Check Completed Campaigns</button>
            </div>
            <div className="back">
                <div className="headings">Campaigns</div>
                <div className="table-container">
                    <table className="table-body">
                        <thead className="head">
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Target Amount</th>
                                <th>Current Amount Raised</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="body">
                            {campaigns.map((campaign) => (
                                <tr key={campaign.id}>
                                    <td>{campaign.name}</td>
                                    <td>{campaign.description}</td>
                                    <td>{campaign.startDate}</td>
                                    <td>{campaign.endDate}</td>
                                    <td>{campaign.targetAmount}</td>
                                    <td>{campaign.currentAmountRaised}</td>
                                    <td>{campaign.status}</td>
                                    <td>
                                        <button className="update-button" onClick={() => handleUpdate(campaign)}>Update</button>
                                        <button className="delete-button" onClick={() => handleDelete(campaign.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <br />
            <div className="placeForm">
                <button className="tooglebutton" onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel Application" : "Register Campaign"}</button>
                {showForm && (
                    <div className='form'>
                        <div className='Headings'>{selectedCampaign ? "Update campaign" : "Register Campaign"}</div>
                        <form className="formData" onSubmit={handleSubmit}>
                            <div className='attribute'>Name: </div>
                            <input type="text" name="name" value={campaignData.name} onChange={handleChange} required />
                            <div className='attribute'>Description:</div>
                            <input type="text" name="description" value={campaignData.description} onChange={handleChange} required />
                            <div className='attribute'>Start Date: </div>
                            <input type="date" name="startDate" value={campaignData.startDate} onChange={handleChange} />
                            <div className='attribute'>End Date: </div>
                            <input type="date" name="endDate" value={campaignData.endDate} onChange={handleChange} />
                            <div className='attribute'>Target Amount :</div>
                            <input type="text" name="targetAmount" value={campaignData.targetAmount} onChange={handleChange} required />
                            <div className="attribute"> Status: </div>
                            <select className="accType" name="status" value={campaignData.status} onChange={handleChange}>
                                <option className="selection" value="Active">Active</option>
                                <option className="selection" value="In Progress">In Progress</option>
                            </select>
                            <input type="hidden" name="franchiseID" value={campaignData.franchiseID} />
                            {selectedCampaign ? (
                                <button className='edit-btn' onClick={handleSubmitUpdate}>Update Campaign</button>
                            ) : (
                                <button className='edit-btn' type="submit">Add Campaign</button>
                            )}
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Campaigns;
