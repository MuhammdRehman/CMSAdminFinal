import React, { useState, useEffect } from 'react';
import { fs } from '../Config/Config';

const ListVolunteer = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [searchDocID, setSearchDocID] = useState('');
  const [searchedVolunteer, setSearchedVolunteer] = useState(null);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const volunteerRef = fs.collection('volunteer');
        const snapshot = await volunteerRef.get();
        const volunteerData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVolunteers(volunteerData);
      }
      catch (error) {
        console.error('Error fetching volunteers:', error.message);
      }
    };

    fetchVolunteers();
  }, []);

  const handleSearch = async () => {
    try {
      const volunteerDoc = await fs.collection('volunteer').doc(searchDocID).get();
      if (volunteerDoc.exists) {
        setSearchedVolunteer({ id: volunteerDoc.id, ...volunteerDoc.data() });
      } else {
        setSearchedVolunteer(null);
      }
    } catch (error) {
      console.error('Error searching volunteer:', error.message);
    }
  };

  return (


    <div className="back">
      <div className='search-cont'>
        <input className='search-bar' type="text" placeholder="Search by Doc ID" value={searchDocID} onChange={(e) => setSearchDocID(e.target.value)} />
        <button className='search-bar-btn' onClick={handleSearch}>Search</button>
      </div>
      {searchedVolunteer && (
        <div className='volunteer-info'>
          <div className='headings'>Volunteer's Record</div>
          <div className='information'>
            <div><strong>ID:</strong> {searchedVolunteer.id}</div>
            <div><strong>Display Name:</strong> {searchedVolunteer.displayName}</div>
            <div><strong>Phone Number:</strong> {searchedVolunteer.phoneNumber}</div>
            <div><strong>Email:</strong> {searchedVolunteer.email}</div>
            <div><strong>CNIC</strong> {searchedVolunteer.cnic}</div>
            <div><strong>Address:</strong> {searchedVolunteer.address}</div>
          </div>
        </div>
      )}

      {!searchedVolunteer && searchDocID && (
        <div>No volunteer found with the provided Doc ID.</div>
      )}

      <div className="headings">Registered Volunteers</div>
      <div className="table-container">
        <table className="table-body">
          <thead className="head">
            <tr>
              <th>Volunteer ID</th>
              <th>Display Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>CNIC</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody className="body">
            {volunteers.map((volunteer, index) => (
              <tr key={index}>
                <td><strong>{volunteer.id}</strong></td>
                <td>{volunteer.displayName}</td>
                <td>{volunteer.phoneNumber}</td>
                <td>{volunteer.email}</td>
                <td>{volunteer.cnic}</td>
                <td>{volunteer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListVolunteer;