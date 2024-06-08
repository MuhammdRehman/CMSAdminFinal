import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { RxCross1 } from "react-icons/rx";
import "./Adminstyle/navbar.css";
import { fs, auth } from "../Config/Config";

const GetcurrUser = () => {
  const [useridtype, setUseridtype] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        fs.collection('franchise').doc(user.uid).get().then(snapshot => {
          if (snapshot.exists) {
            setUseridtype("franchise");
          }
          else {
            setUseridtype("admin");
          }
        }).catch(error => {
          console.error("Error getting user document:", error);
          setUseridtype(null);
        });
      }
      else {
        setUseridtype(null);
      }
    });
  }, []);

  return useridtype;
}

const AdminNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);  
  const toggleNavbar = () => { setIsOpen(!isOpen); };

  const loggedUser = GetcurrUser();
  console.log(loggedUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };


  const renderLinks = (loggedUser) => {
    if (loggedUser === "franchise") {
      return (
        <>
          <NavLink to="/franchiseInformation" className="nav-links">Franchise Detials</NavLink>
          <NavLink to="/beneficiary" className="nav-links">Beneficiaries</NavLink> 
          <NavLink to="/campaigns" className="nav-links">Campaigns</NavLink>
          <NavLink to="/projects" className="nav-links">Projects</NavLink>
          <NavLink to="/approveprojects" className="nav-links">Approve Projects</NavLink>
          

        </>
      );
    }
    else if (loggedUser === "admin") {
      return (
        <>
          <NavLink to="/dashboard" className="nav-links">Dashboard</NavLink> 
          <NavLink to="/franchise" className="nav-links">Franchises</NavLink>
          <NavLink to="/regFranchise" className="nav-links">Register Franchise</NavLink>
          <NavLink to="/resolvecomplains" className="nav-links">Check Complains</NavLink>


        </>
      );
    }
  };

  const renderAuthLinks = () => {
    if (loggedUser) {
      return (
        <button onClick={handleLogout} className="logout-button">Logout</button>
      );
    } 
  };

  //<div className="logo">إيثار</div>

  return (
    <div className={`navwrapper navbar ${isOpen ? 'open' : ''}`}>

      <div className="logo-container">
        <div className="logo">إيثار</div>
        {isOpen ? (
          <RxCross1 className="menu-icon" onClick={toggleNavbar} />
        ) : (
          <FaBars className="menu-icon" onClick={toggleNavbar} />
        )}
      </div>

      <div className="links">


        {renderLinks(loggedUser)}
      </div>
      <div className="auth-links">
        {renderAuthLinks()}
      </div>
    </div>
  );
};

export default AdminNavbar;
