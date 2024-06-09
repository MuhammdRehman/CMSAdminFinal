import React, { useEffect, useState } from 'react';
import { auth, fs } from '../Config/Config';

import "./Adminstyle/displayForm.css";
const FranchiseDetails = () => {
  const [franchiseData, setFranchiseData] = useState(null);

  useEffect(() => {
    const fetchFranchiseData = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const franchiseRef = fs.collection("franchise").doc(currentUser.uid);
          const doc = await franchiseRef.get();

          if (doc.exists) {
            setFranchiseData(doc.data());
          }
          else {
            console.log("No franchise data found");
          }
        }
      }
      catch (error) {
        console.error("Error fetching franchise data:", error.message);
      }
    };

    fetchFranchiseData();
  }, []);

  return (
    <div className='donor'>
      <h2>Franchise Information</h2>
      
      {franchiseData && (
        <div className='props'>
          <div className='attributes'>Name: </div>
          <div className='values'>{franchiseData.name}</div>

          <div className='attributes'>Account's Email:</div>
          <div className='values'>{franchiseData.managerEmail}</div>

          <div className='attributes'>City:</div>
          <div className='values'>{franchiseData.city}</div>

          <div className='attributes'>Location:</div>
          <div className='values'>{franchiseData.location}</div>

          <div className='attributes'>Contact Number: </div>
          <div className='values'>{franchiseData.contact}</div>

          <div className='attributes'>District: </div>
          <div className='values'>{franchiseData.district}</div>

          <div className='attributes'>Zip Code: </div>
          <div className='values'>{franchiseData.zipCode}</div>

        </div>
      )}
    </div>
  );
};

export default FranchiseDetails;
