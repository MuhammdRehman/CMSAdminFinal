import React, { useEffect, useState } from "react";
import { fs } from "../Config/Config";
import "./Adminstyle/tables.css"; // Assuming the styles are in this file

const ResolveComplains = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [complains, setComplains] = useState([]);

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const snapshot = await fs.collection("volunteer").get();
                const volunteersData = await Promise.all(snapshot.docs.map(async (doc) => {
                    const volunteerData = doc.data();
                    const complainDoc = await fs.collection("complains").doc(doc.id).get();
                    const complainData = complainDoc.exists ? complainDoc.data().complainData : [];
                    return {
                        id: doc.id,
                        ...volunteerData,
                        complainsCount: complainData.length,
                    };
                }));
                const filteredVolunteers = volunteersData.filter(volunteer => volunteer.complainsCount > 0);
                setVolunteers(filteredVolunteers);
            } catch (error) {
                console.error("Error fetching volunteers:", error);
            }
        };

        fetchVolunteers();
    }, []);

    const handleVolunteerClick = async (volunteer) => {
        setSelectedVolunteer(volunteer);
        try {
            const complainDocRef = fs.collection("complains").doc(volunteer.id);
            const complainDoc = await complainDocRef.get();

            if (complainDoc.exists) {
                const data = complainDoc.data();
                setComplains(data.complainData || []);
            } else {
                setComplains([]);
            }
        } catch (error) {
            console.error("Error fetching complains:", error);
        }
    };

    const handleResolveComplain = async (index) => {
        try {
            const updatedComplains = complains.filter((_, i) => i !== index);
            const complainDocRef = fs.collection("complains").doc(selectedVolunteer.id);

            await complainDocRef.set({
                complainData: updatedComplains,
            }, { merge: true });

            setComplains(updatedComplains);
            setVolunteers(prevVolunteers => prevVolunteers.map(vol =>
                vol.id === selectedVolunteer.id ? { ...vol, complainsCount: updatedComplains.length } : vol
            ));
        } catch (error) {
            console.error("Error resolving complain:", error);
        }
    };

    return (
        <div className="back">
            {!selectedVolunteer ? (
                <>
                    <div className="headings">Volunteers Complains</div>
                    <div className="volunteers-list">
                        {volunteers.map((volunteer) => (
                            <div key={volunteer.id} className="volunteer-card" onClick={() => handleVolunteerClick(volunteer)}>
                                <div>{volunteer.displayName}</div>
                                <div className="complain-number">Complains: {volunteer.complainsCount}</div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="complains-container">
                    <button className="complete" onClick={() => setSelectedVolunteer(null)}>Back to Volunteers</button>
                    <div className="complainer">{selectedVolunteer.displayName}'s Complains</div>

                    <div className="table-container">
                        <table className="table-body">
                            <thead className="head">
                                <tr>
                                    <th>Display Name</th>
                                    <th>Email</th>
                                    <th>Title</th>
                                    <th>Complain</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody className="body">
                                {complains.map((complain, index) => (
                                    <tr key={index}>
                                        <td>{complain.displayName}</td>
                                        <td>{complain.email}</td>
                                        <td>{complain.title}</td>
                                        <td>{complain.complain}</td>
                                        <td>
                                            <button className="update-button" onClick={() => handleResolveComplain(index)}>Resolve</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResolveComplains;
