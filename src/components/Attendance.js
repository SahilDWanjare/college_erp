import React, { useState, useEffect, useRef } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "../components/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysInMonth = {
  January: 31, February: 28, March: 31, April: 30,
  May: 31, June: 30, July: 31, August: 31,
  September: 30, October: 31, November: 30, December: 31,
};

const Attendance = () => {
  const [isELearningOpen, setIsELearningOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", id: "" });
  const [attendanceData, setAttendanceData] = useState({});
  const tableRef = useRef(null); // Reference to the attendance table
  const chartRefs = useRef({}); // References to chart containers

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    document.body.classList.toggle("blur-background", !isProfileOpen);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add student (local state, optionally save to backend)
  const handleAddStudent = () => {
    const newAttendance = {};
    months.forEach((month) => {
      newAttendance[month] = Array(daysInMonth[month]).fill("P");
    });

    setStudents([...students, { ...formData, attendance: newAttendance }]);
    setFormData({ name: "", id: "" });
  };

  // Handle attendance change
  const handleAttendanceChange = (studentIdx, month, dayIdx, value) => {
    const updated = [...students];
    updated[studentIdx].attendance[month][dayIdx] = value;
    setStudents(updated);
  };

  // Calculate attendance percentage
  const calculatePercentage = (attArray) => {
    const total = attArray.length;
    const present = attArray.filter((a) => a === "P").length;
    return ((present / total) * 100).toFixed(1);
  };

  // Calculate overall attendance distribution for pie chart
  const calculateOverallAttendance = (studentAttendance) => {
    let totalDays = 0;
    let presentDays = 0;

    months.forEach((month) => {
      const days = studentAttendance[month] || [];
      totalDays += days.length;
      presentDays += days.filter((status) => status === "P").length;
    });

    const absentDays = totalDays - presentDays;
    return {
      present: ((presentDays / totalDays) * 100).toFixed(1),
      absent: ((absentDays / totalDays) * 100).toFixed(1),
    };
  };

  // Fetch attendance data from Django API
  const fetchAttendance = async (studentId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/attendance/${studentId}/`);
      const data = await response.json();
      if (response.ok) {
        const attendanceByMonth = {};
        months.forEach((month) => {
          attendanceByMonth[month] = Array(daysInMonth[month]).fill("A");
        });

        data.attendance.forEach((record) => {
          const month = record.month;
          const dayIdx = record.day - 1;
          if (attendanceByMonth[month]) {
            attendanceByMonth[month][dayIdx] = record.status;
          }
        });

        setAttendanceData((prev) => ({
          ...prev,
          [studentId]: attendanceByMonth,
        }));
      } else {
        console.error("Error fetching attendance:", data.error);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  // Fetch attendance for all students on mount
  useEffect(() => {
    students.forEach((student) => {
      if (student.id) {
        fetchAttendance(student.id);
      }
    });
  }, [students]);

  // Bar chart data for a student (monthly percentages)
  const getBarChartData = (studentId) => {
    const studentAttendance = attendanceData[studentId] || students.find((s) => s.id === studentId)?.attendance;
    if (!studentAttendance) return null;

    const percentages = months.map((month) => calculatePercentage(studentAttendance[month]));

    return {
      labels: months,
      datasets: [
        {
          label: "Attendance Percentage",
          data: percentages,
          backgroundColor: "rgb(45, 66, 204)",
          borderColor: "rgb(8, 21, 63)",
          borderWidth: 1,
        },
      ],
    };
  };

  // Pie chart data for a student (overall Present vs Absent)
  const getPieChartData = (studentId) => {
    const studentAttendance = attendanceData[studentId] || students.find((s) => s.id === studentId)?.attendance;
    if (!studentAttendance) return null;

    const { present, absent } = calculateOverallAttendance(studentAttendance);

    return {
      labels: ["Present", "Absent"],
      datasets: [
        {
          label: "Attendance Distribution",
          data: [present, absent],
          backgroundColor: ["rgb(66, 76, 213)", "rgb(235, 35, 35)"],
          borderColor: ["rgb(0, 0, 17)", "rgb(79, 3, 3)"],
          borderWidth: 1,
        },
      ],
    };
  };

  // Download PDF with attendance table and charts
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const downloadPDF = async () => {
    setIsGeneratingPDF(true);
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    let yOffset = 10;

    // Add title
    pdf.setFontSize(16);
    pdf.text("Attendance Report", margin, yOffset);
    yOffset += 10;

    // Capture and add attendance table
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (yOffset + imgHeight > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        yOffset = margin;
      }

      pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);
      yOffset += imgHeight + 10;
    }

    // Capture and add charts for each student
    for (const student of students) {
      const chartContainer = chartRefs.current[student.id];
      if (chartContainer) {
        const canvas = await html2canvas(chartContainer, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (yOffset + imgHeight > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          yOffset = margin;
        }

        pdf.setFontSize(12);
        pdf.text(`Charts for ${student.name}`, margin, yOffset);
        yOffset += 5;

        pdf.addImage(imgData, "PNG", margin, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight + 10;
      }
    }

    // Save the PDF
    pdf.save("attendance_report.pdf");

    setIsGeneratingPDF(false);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Student Module</h2>
        <ul>
          <li><i className="fas fa-book"></i> Syllabus</li>
          <Link className="profile-link" to="/profile" state={{ fromDashboard: true }}>
            <li><i className="fas fa-user"></i> Profile</li>
          </Link>
          <li className="dropdown" onClick={() => setIsELearningOpen(!isELearningOpen)}>
            <i className="fas fa-laptop"></i> E-Learning
          </li>
          <li><i className="fas fa-wallet"></i> D-Wallet</li>
          <li><i className="fas fa-file-alt"></i> Examination</li>
          <li><i className="fas fa-chart-bar"></i> Result Sheet</li>
          <Link className="profile-link" to="/Certificate" state={{ fromDashboard: true }}>
            <li><i className="fas fa-certificate"></i> Certificate</li>
          </Link>
          <li><i className="fas fa-book-open"></i> Library</li>
        </ul>
        <div className="Contact-us">
          <p><i className="fa-solid fa-address-card"></i>Contact Developer</p>
          <p><i className="fa-solid fa-phone"></i>7058918272</p>
          <a href="mailto:sahilwanjare99@gmail.com">
            <p><i className="fa-solid fa-envelope"></i>sahilwanjare99@gmail.com</p>
          </a>
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
            <img className="dashboard_logo" alt="logo" src={require("../assets/mainlogo.png")} />
            <h1 className="heading-1">College Management System</h1>
          </div>
          <div className="profile">
            <div className="profile-name" onClick={toggleProfileDropdown}>
              <i className="fa-solid fa-circle-user"></i>
              <div><span>Sahil Dada Wanjare</span></div>
            </div>
            <Link className="link" to="/login" state={{ fromLogin: true }}>
              <button className="logout-btn">Logout</button>
            </Link>
          </div>
        </header>

        {/* Profile Dropdown */}
        {isProfileOpen && (
          <div className="profile-dropdown">
            <div className="minimize" onClick={toggleProfileDropdown}>
              <i className="fa-solid fa-circle-xmark"></i>
            </div>
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
        <div className="attendance-body">

          <div className="container">
            <h1>Attendance Sheet</h1>

            <div className="input-form">
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="id"
                placeholder="Student ID"
                value={formData.id}
                onChange={handleChange}
              />
              <button onClick={handleAddStudent}>Add Student</button>
              {students.length > 0 && (
                <button onClick={downloadPDF} className="download-btn">
                  Download PDF
                </button>
              )}
            </div>

            {students.length > 0 && (
              <div className="table-wrapper" ref={tableRef}>
                <table>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Student ID</th>
                      <th>Days of Months</th>
                      {months.map((month) => (
                        <th key={month}>
                          {month}
                          <br />
                          Avg %
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, sIdx) => (
                      <tr key={sIdx}>
                        <td>{student.name}</td>
                        <td>{student.id}</td>
                        <td>
                          <div className="day-labels">
                            {Array.from({ length: 31 }, (_, i) => (
                              <div key={i}>Day {i + 1}</div>
                            ))}
                          </div>
                        </td>
                        {months.map((month) => (
                          <td key={month}>
                            <div className="month-column">
                              <div className="percentage">
                                {calculatePercentage(
                                  attendanceData[student.id]?.[month] || student.attendance[month]
                                )}
                                %
                              </div>
                              <div className="day-selectors">
                                {(attendanceData[student.id]?.[month] || student.attendance[month]).map(
                                  (val, dIdx) => (
                                    <select
                                      key={dIdx}
                                      value={val}
                                      onChange={(e) =>
                                        handleAttendanceChange(sIdx, month, dIdx, e.target.value)
                                      }
                                    >
                                      <option value="P">P</option>
                                      <option value="A">A</option>
                                    </select>
                                  )
                                )}
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Chart Section */}
            {students.map((student) => (
              <div
                key={student.id}
                className="chart-container"
                ref={(el) => (chartRefs.current[student.id] = el)}
                style={{ marginTop: "20px" }}
              >
                <h2>Attendance Charts for {student.name}</h2>
                <div className="charts-wrapper">
                  {/* Bar Chart */}
                  <div className="chart-item">
                    <h3>Monthly Attendance (Bar)</h3>
                    {getBarChartData(student.id) ? (
                      <Bar
                        data={getBarChartData(student.id)}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: "top" },
                            title: { display: true, text: `${student.name} Monthly Attendance` },
                          },
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 100,
                              title: { display: true, text: "Percentage (%)" },
                            },
                          },
                        }}
                      />
                    ) : (
                      <p>Loading bar chart data...</p>
                    )}
                  </div>

                  {/* Pie Chart */}
                  <div className="chart-item">
                    <h3>Overall Attendance Distribution (Pie)</h3>
                    {getPieChartData(student.id) ? (
                      <Pie
                        data={getPieChartData(student.id)}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: { position: "top" },
                            title: { display: true, text: `${student.name} Attendance Distribution` },
                          },
                        }}
                      />
                    ) : (
                      <p>Loading pie chart data...</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Attendance;