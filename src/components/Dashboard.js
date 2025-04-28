import React, { useState, useRef, useEffect } from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [isELearningOpen, setIsELearningOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const bellRef = useRef(null); // Ref for the alert-bell

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

  // Function to trigger bell animation
  const triggerBellAnimation = () => {
    const bell = bellRef.current;
    if (bell) {
      bell.classList.add('ring');
      setTimeout(() => {
        bell.classList.remove('ring');
      }, 3000); // Stop animation after 3 seconds
    }
  };

  // Handle bell click
  const handleBellClick = () => {
    triggerBellAnimation();
  };

  // Optional: Trigger animation on mount or external event (e.g., new update)
  useEffect(() => {
    // Simulate new update (replace with actual logic, e.g., WebSocket, API)
    const simulateNewUpdate = setTimeout(() => {
      triggerBellAnimation();
    }, 2000); // Triggers 2 seconds after mount

    return () => clearTimeout(simulateNewUpdate); // Cleanup
  }, []);

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
          <Link className='profile-link' to='/Certificate' state={{ fromDashboard: true }}><li><i className="fas fa-certificate"></i> Certificate</li></Link>

          <li><i className="fas fa-book-open"></i> Library</li>
        </ul>

        <div className="Contact-us">
          <p><i className="fa-solid fa-address-card"></i>Contact Developer</p>
          <p><i className="fa-solid fa-phone"></i>7058918272</p>
          <a href="sahilwanjare99@gmail.com" target="_blank"><p><i className="fa-solid fa-envelope"></i>sahilwanjare99@gmail.com</p></a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
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
              <i className="fa-solid fa-circle-user"></i>
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
            <div className="minimize" onClick={toggleProfileDropdown}><i className="fa-solid fa-circle-xmark"></i></div>
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

        {/* Dashboard Cards */}
        <section className="cards">
          <Link className='profile-link' to='/Mysyllabus' state={{ fromDashboard: true }}><div className="card">
            <i className="fas fa-book-open card-icon"></i>
            <h3>My Syllabus Status</h3>
            <p>Your syllabus will be loading soon</p>
          </div></Link>

          <Link className='profile-link' to='/Attendance' state={{ fromDashboard: true }}><div className="card">
            <i className="fas fa-users card-icon"></i>
            <h3>My Attendance</h3>
            <p>Your attendance will be loading soon</p>
          </div></Link>

          <div className="card">
            <i className="fas fa-clipboard-list card-icon"></i>
            <h3>My Exam</h3>
            <p>Need to study hard, Exam is on the way</p>
          </div>

          <div className="card">
            <i className="fas fa-chart-line card-icon"></i>
            <h3>My Result</h3>
            <p>Your results will be displayed here</p>
          </div>

          <div className="card">
            <i className="fas fa-book card-icon"></i>
            <h3>Back Subject Details</h3>
            <p>Click next for details</p>
          </div>

          <div className="card">
            <div className="alert-bell" ref={bellRef} onClick={handleBellClick}>
              <i className="fas fa-bell red"></i>
            </div>
            <h3>Important Updates</h3>
            <p>Stay tuned for updates</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;