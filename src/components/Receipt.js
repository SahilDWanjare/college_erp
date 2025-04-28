import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Link } from "react-router-dom";

const Receipt = ({ studentData = {} }) => {
  const {
    name = "N/A",
    studentId = "N/A",
    academicSession = "N/A",
    semester = "N/A",
    courseYear = "N/A",
    financialYear = "N/A",
    receiptNo = "N/A",
    receiptDate = "N/A",
    amount = "1000 rs- only",
  } = studentData;

  // Function to generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Exam Fee Payment Receipt", 70, 20);
    doc.setFont("helvetica", "normal");

    // Student Details
    doc.text(`Student Name: ${name}`, 20, 40);
    doc.text(`Student ID: ${studentId}`, 20, 50);
    doc.text(`Academic Session: ${academicSession}`, 20, 60);
    doc.text(`Semester: ${semester}`, 20, 70);
    doc.text(`Course Year: ${courseYear}`, 20, 80);
    doc.text(`Financial Year: ${financialYear}`, 20, 90);

    // Receipt Table
   
    

    doc.save("Exam_Fee_Receipt.pdf");
  };
  const doc = new jsPDF();
  autoTable(doc, {
    startY: 100,
    head: [["Sr. No.", "Receipt No.", "Receipt Date", "Amount (Rs.)"]],
    body: [[1, receiptNo, receiptDate, amount]],
  });

  return (<>
  <div className="cut">
        <Link className='profile-link ' to='/Dashboard' state={{ fromDashboard: true }}><i class="fa-solid fa-right-to-bracket"></i></Link>
      </div>
    <div className="receipt-container">
      <div className="receipt-header-exit">
      

      </div>
      
      <div className="receipt-box">
        {/* Header */}
        <div className="receipt-header">
          <h2>Exam Fee Receipt</h2>
          <i className="fas fa-file-invoice"></i>
        </div>

        {/* Receipt Details */}
        <div className="receipt-body">
          <div className="info">
            <span>👤 Student Name:</span> {name}
          </div>
          <div className="info">
            <span>🆔 Student ID:</span> {studentId}
          </div>
          <div className="info">
            <span>📅 Academic Session:</span> {academicSession}
          </div>
          <div className="info">
            <span>📖 Semester:</span> {semester}
          </div>
          <div className="info">
            <span>🎓 Course Year:</span> {courseYear}
          </div>
          <div className="info">
            <span>📆 Financial Year:</span> {financialYear}
          </div>
        </div>

        {/* Receipt Table */}
        <div className="receipt-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Receipt No.</th>
                <th>Date</th>
                <th>Amount (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>{receiptNo}</td>
                <td>{receiptDate}</td>
                <td>{amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Download Button */}
        
      </div>
      <button className="download-btn" onClick={generatePDF}>
          <i className="fas fa-download"></i> Download Receipt
        </button>

    </div>
    </>
    
  );
};

export default Receipt;
