import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "../components/style.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const MySyllabus = () => {
  const [isELearningOpen, setIsELearningOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to toggle profile dropdown and add/remove blur effect
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    if (!isProfileOpen) {
      document.body.classList.add("blur-background");
    } else {
      document.body.classList.remove("blur-background");
    }
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [fileType, setFileType] = useState("image"); // "pdf" for PDFs, "image" for JPG/PNG
  const syllabusFile = "/Screenshot 2025-03-24 204345.png"; // Change to "/syllabus.jpg" if image

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = syllabusFile;
    link.download = "syllabus.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Student Module</h2>
        <ul>
          <li><i className="fas fa-book"></i> Syllabus</li>
          <Link className='profile-link' to='/profile' state={{ fromDashboard: true }}><li><i className="fas fa-user"></i>Profile </li></Link>

          {/* E-Learning Dropdown */}
          <li className="dropdown" onClick={() => setIsELearningOpen(!isELearningOpen)}>
            <i className="fas fa-laptop"></i> E-Learning
            {/* <i className={`fas fa-chevron-${isELearningOpen ? "up" : "down"} dropdown-icon`}></i> */}
          </li>
          

          <li><i className="fas fa-wallet"></i> D-Wallet</li>
          <li><i className="fas fa-file-alt"></i> Examination</li>
          <li><i className="fas fa-chart-bar"></i> Result Sheet</li>
          <Link className='profile-link' to='/Certificate' state={{ fromDashboard: true }}><li><i className="fas fa-certificate"></i> Certificate</li></Link>
          <li><i className="fas fa-book-open"></i> Library</li>
        </ul>
        <div className="Contact-us">
          <p><i class="fa-solid fa-address-card"></i>Contact Developer</p>
          <p><i class="fa-solid fa-phone"></i>7058918272</p>
          <a href="sahilwanjare99@gmail.com" target="_blank"><p><i class="fa-solid fa-envelope"></i>sahilwanjare99@gmail.com</p></a>






        </div>
      </aside>
      {/* Main Content */}
      <main className="main-content" >
        {/* Navbar */}
        <header className="navbar">
          <div className="hamburger" onClick={toggleSidebar}>
            <i className={`fas ${isSidebarOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>
          <div className="navbar-brand">
            <img className="dashboard_logo" alt="syllabus" src={require('../assets/mainlogo.png')} />
            <h1 className="heading-1">College Management System</h1>
          </div>
          <div className="profile">
            <div className="profile-name" onClick={toggleProfileDropdown}>
              <i class="fa-solid fa-circle-user"></i>
              <div><span>Sahil Dada Wanjare</span></div>

            </div>
            <Link className='link' to='/login' state={{ fromLogin: true }}>
              <button className="logout-btn">Logout</button>
            </Link>
          </div>
        </header>
        <div className="cut">
          <Link className='profile-link' to='/Dashboard' state={{ fromDashboard: true }}><i class="fa-solid fa-right-to-bracket"></i></Link>
        </div>
        {/* Profile Dropdown (Appears at the right end above everything) */}
        {isProfileOpen && (
          <div className="profile-dropdown">
            <div className="minimize" onClick={toggleProfileDropdown}><i class="fa-solid fa-circle-xmark"></i></div>
            <p><strong>Sahil Dada Wanjare</strong></p>
            <p>103220303</p>
            <p>Student</p>
            <p>TE-IT-A</p>
            <p>SEMESTER VI (Last)</p>
            <p>Modern College of Engineering</p>
            <p>sahilwanjare99@gmail.com</p>
            <p>7058918272</p>
            <button className="change-password">Change Password</button>
          </div>
        )}

        <div style={{ padding: "20px", textAlign: "center" }} className="page-transition">
          <h2 className="syllabus-heading">My Syllabus</h2>
          <div style={{
            width: "80%", maxWidth: "800px", height: "500px",
            margin: "auto", border: "2px solid #ddd", borderRadius: "10px",
            overflow: "hidden", background: "#f9f9f9"
          }}>
            {fileType === "pdf" ? (
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={syllabusFile} />
              </Worker>
            ) : (
              <img src={syllabusFile} alt="Syllabus" style={{ width: "100%", height: "100%", objectFit: "contain" }} onClick={() => setIsPopupOpen(true)} />
            )}

          </div>

          <button onClick={downloadImage} className="download-btn">
            <i style={{ color: "white", fontSize: "0.8rem" }} class="fa-solid fa-download"></i> Download Image
          </button>

          {isPopupOpen && (
            <div className="popup-overlay" style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex",
              justifyContent: "center", alignItems: "center",
            }} onClick={() => setIsPopupOpen(false)}>
              <div className="popup-content" style={{
                position: "relative", backgroundColor: "white", padding: "10px",
                borderRadius: "10px", maxWidth: "90%", maxHeight: "90%", overflow: "auto",
              }}>
                <span className="close-btn" style={{
                  position: "fixed", top: "10px", right: "10px", fontSize: "2.5rem",
                  cursor: "pointer", color: "white"
                }} onClick={() => setIsPopupOpen(false)}>&times;</span>
                <img src={syllabusFile} alt="Syllabus" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
            </div>
          )}

        </div>


      </main>
    </div>
  );
};

export default MySyllabus;
