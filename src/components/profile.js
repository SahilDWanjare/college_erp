import React, { useState } from "react";
import "../components/style.css";
import { Link } from "react-router-dom";
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    fathersoccupation: "",
    motheroccupation: "",
    address: "",
    studentID: "",
    course: "",
    semester: "",
    college: "Modern College of Engineering",
    courseYear: "",
    transferYear: "",
    admissionPattern: "",
    admissionStatus: "",
    section: "",
    studentCode: "",
    dateOfRegistration: "",
    admissionMode: "",
    admittedAcademicYear: "",
    currentAcademicYear: "",
    studentMobileNo: "",
    motherName: "",
    parentMobileNo: "",
    guardianMobileNo: "",
    guardianEmail: "",
    fatherEmail: "",
    motherEmail: ""
  });

  const [photo, setPhoto] = useState(null);
  const [signature, setSignature] = useState(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
  
    Object.keys(profile).forEach(key => formData.append(key, profile[key]));
    if (photo) formData.append("photo", photo);
    if (signature) formData.append("signature", signature);
  
    try {
      const response = await fetch("http://localhost:5000/api/student/save", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Profile saved successfully!");
      } else {
        alert("Error saving profile: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    }
  };
  
  const [isELearningOpen, setIsELearningOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle profile dropdown and add/remove blur effect
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    if (!isProfileOpen) {
      document.body.classList.add("blur-background");
    } else {
      document.body.classList.remove("blur-background");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "photo") setPhoto(URL.createObjectURL(file));
      else if (type === "signature") setSignature(URL.createObjectURL(file));
    }
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Student Module</h2>
        <ul>
          <Link className='profile-link' to='/Mysyllabus' state={{ fromDashboard: true }}><li><i className="fas fa-book"></i> Syllabus</li></Link>
          <li><i className="fas fa-user" onClick={useNavigate('/profile.js')}></i> Profile</li>

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
        <div className="cut">
          <Link className='profile-link ' to='/Dashboard' state={{ fromDashboard: true }}><i class="fa-solid fa-right-to-bracket"></i></Link>
        </div>
        <div className="profile-container page-transition">
          <h2>Student Profile</h2>
          <form className="profile-form">
            {/* Personal Information */}
            <h3>Personal Information</h3>
            <div className="form-group">
              <label>Full Name:</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Date of Birth:</label>
              <input type="date" name="dob" value={profile.dob} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <select name="gender" value={profile.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={profile.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input type="text" name="phone" value={profile.phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Fathers Occupation:</label>
              <input type="text" name="fathersoccupation" value={profile.fathersoccupation} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mothers Occupation:</label>
              <input type="text" name="motheroccupation" value={profile.motheroccupation} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea name="address" value={profile.address} onChange={handleChange} required />
            </div>

            {/* Educational Information */}
            <h3>Educational Information</h3>
            <div className="form-group">
              <label>Student ID:</label>
              <input type="text" name="studentID" value={profile.studentID} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Course:</label>
              <input type="text" name="course" value={profile.course} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Semester:</label>
              <input type="text" name="semester" value={profile.semester} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>College:</label>
              <input type="text" name="college" value={profile.college} disabled />
            </div>

            {/* Admission Details */}
            <h3>Admission Details</h3>
            <div className="form-group">
              <label>Course Year:</label>
              <input type="text" name="courseYear" value={profile.courseYear} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Transfer Year:</label>
              <input type="text" name="transferYear" value={profile.transferYear} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Admission Pattern:</label>
              <input type="text" name="admissionPattern" value={profile.admissionPattern} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Admission Status:</label>
              <input type="text" name="admissionStatus" value={profile.admissionStatus} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Section:</label>
              <input type="text" name="section" value={profile.section} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Student Code:</label>
              <input type="text" name="studentCode" value={profile.studentCode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Date of Registration:</label>
              <input type="text" name="dateOfRegistration" value={profile.dateOfRegistration} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Admission Mode:</label>
              <input type="text" name="admissionMode" value={profile.admissionMode} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Admitted Academic Year:</label>
              <input type="text" name="admittedAcademicYear" value={profile.admittedAcademicYear} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Current Academic Year:</label>
              <input type="text" name="currentAcademicYear" value={profile.currentAcademicYear} onChange={handleChange} required />
            </div>

            {/* Contact Details */}
            <h3>Contact Details</h3>
            <div className="form-group">
              <label>Student Mobile No:</label>
              <input type="text" name="studentMobileNo" value={profile.studentMobileNo} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mother's Name:</label>
              <input type="text" name="motherName" value={profile.motherName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Parent Mobile No:</label>
              <input type="text" name="parentMobileNo" value={profile.parentMobileNo} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Guardian Mobile No:</label>
              <input type="text" name="guardianMobileNo" value={profile.guardianMobileNo} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Guardian Email ID:</label>
              <input type="email" name="guardianEmail" value={profile.guardianEmail} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Father Email ID:</label>
              <input type="email" name="fatherEmail" value={profile.fatherEmail} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mother Email ID:</label>
              <input type="email" name="motherEmail" value={profile.motherEmail} onChange={handleChange} required />
            </div>

            {/* Upload Section */}
            <h3>Upload Documents</h3>
            <div className="form-group file-input">
              <label>Upload Passport-Size Photo:</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "photo")} />
              {photo && <img src={photo} alt="Passport Size" className="preview" />}
            </div>

            <div className="form-group file-input">
              <label>Upload Signature:</label>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "signature")} />
              {signature && <img src={signature} alt="Signature" className="preview" />}
            </div>

            <button type="submit" className="save-btn">Save Profile</button>
          </form>
        </div>
      </main>
    </div>

  );
};

export default Profile;