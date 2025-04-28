import React, { useState } from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const Certificate = () => {
    const [isELearningOpen, setIsELearningOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [photo, setPhoto] = useState(null);

  // Function to toggle profile dropdown and add/remove blur effect
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    if (!isProfileOpen) {
      document.body.classList.add("blur-background");
    } else {
      document.body.classList.remove("blur-background");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    const [selectedCertificate, setSelectedCertificate] = useState(null);
    
    const [certificates, setCertificates] = useState([
      { id: 1, title: "AI & Machine Learning", issuer: "IBM", date: "July 2024", description: "Certification on Artificial Intelligence and Machine Learning by IBM.", image: require("../assets/Google IT Support.jpg") },
      { id: 2, title: "Bootstrap Training", issuer: "Spoken Tutorial", date: "Oct 2024", description: "Completed training in Bootstrap via Spoken Tutorial.", image: require("../assets/Online Business Analytics Course.jpg") },
      { id: 3, title: "Generative AI in Content Creation", issuer: "MCOE Seminar", date: "Nov 2024", description: "Presented a seminar on Generative AI in Content Creation.", image: require("../assets/img3.jpg") },
    ]);
    const handleCertificateClick = (certificate) => {
      setSelectedCertificate(certificate);
    };
  
    const handleAddCertificate = () => {
        if (photo) {
          const newCert = { 
            id: Date.now(), 
            title: "New Certificate", 
            issuer: "Unknown", 
            date: "2025", 
            image: photo
          };
          setCertificates([...certificates, newCert]);
          setPhoto(null);
        }
      };
    

  return (
    <div className={`dashboard page-transition`}>
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Student Module</h2>
        <ul>
          <Link className='profile-link' to='/Mysyllabus' state={{ fromDashboard: true }}><li><i className="fas fa-book"></i> Syllabus</li></Link>
          <Link className='profile-link' to='/profile' state={{ fromDashboard: true }}><li><i className="fas fa-user"></i>Profile </li></Link>

          {/* E-Learning Dropdown */}
          <li>
            <i className="fas fa-laptop"></i> E-Learning
          </li>
          <li className="dropdown" onClick={() => setIsELearningOpen(!isELearningOpen)}>
            <i className="fas fa-wallet"></i> D-Wallet
            <i style={{ marginLeft: '1rem' }} className={`fas fa-chevron-${isELearningOpen ? "up" : "down"} dropdown-icon`}></i>
          </li>
          {isELearningOpen && (
            <ul className="submenu">
              <Link className='profile-link' to='/ExamFee' state={{ fromDashboard: true }}><li className="su-li" >Exam Fees</li></Link>
              <Link className='profile-link' to='/CollegeFee' state={{ fromDashboard: true }}><li className="su-li">College Fees</li></Link>
              <Link className='profile-link' to='/Receipt' state={{ fromDashboard: true }}><li className="su-li">Receipt</li></Link>

            </ul>
          )}


          <li><i className="fas fa-file-alt"></i> Examination</li>
          <li><i className="fas fa-chart-bar"></i> Result Sheet</li>
          <li><i className="fas fa-certificate"></i> Certificate</li>
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
            <img className="dashboard_logo" src={require('../assets/mainlogo.png')} />
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
        
        <section className="certificates">
       
          <div className="certificate-list">
          <div className="form-group file-input">
              <label>Upload Certificate Image:</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {photo && <img src={photo} alt="Uploaded Certificate" className="preview" />}
            </div>
            <button className="add-certificate-button" onClick={handleAddCertificate}>+ Add Certificate</button>
            {certificates.map(cert => (
              <div key={cert.id} className="certificate-card" onClick={() => setSelectedCertificate(cert)}>
                <img src={cert.image} alt={cert.title} className="certificate-thumbnail" />
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
              </div>
            ))}
          </div>
          

          {selectedCertificate && (
            
            <div className="certificate-details">
                
              <h2>{selectedCertificate.title}</h2>
              <img src={selectedCertificate.image} alt={selectedCertificate.title} className="certificate-image" />
              <p><strong>Issuer:</strong> {selectedCertificate.issuer}</p>
              <p><strong>Date:</strong> {selectedCertificate.date}</p>
              <p>{selectedCertificate.description}</p>
            </div>
            
          )}
           <div className="cut">
                  <Link className='profile-link ' to='/Dashboard' state={{ fromDashboard: true }}><i class="fa-solid fa-right-to-bracket"></i></Link>
            </div>
        </section>
      </main>
    </div>
  );
};


export default Certificate;

