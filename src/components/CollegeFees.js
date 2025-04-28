import React, { useState } from "react";
import "../components/style.css";
import { Link } from "react-router-dom";

const CollegeFee = () => {
  const [paymentMethod, setPaymentMethod] = useState("debit");
  const [amount, setAmount] = useState("");

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "debit":
      case "credit":
        return (
          <div className="payment-fields">
            <input required type="text" placeholder="Card Number" />
            <input required type="text" placeholder="Expiry Date (MM/YY)" />
            <input required type="password" placeholder="CVV" />
            <input required type="text" placeholder="Cardholder's Name" />
          </div>
        );
      case "netbanking":
        return (
          <div className="payment-fields">
            <select>
              <option>Select Your Bank</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>SBI Bank</option>
              <option>Axis Bank</option>
            </select>
          </div>
        );
      case "wallet":
        return (
          <div className="payment-fields">
            <select>
              <option>Select Wallet</option>
              <option>Paytm</option>
              <option>PhonePe</option>
              <option>Google Pay</option>
            </select>
          </div>
        );
      case "upi":
        return (
          <div className="payment-fields">
            <input type="text" placeholder="Enter UPI ID" />
            <p>or pay using QR-Code</p>
            <div className="qr-code">
              <img className="qr" src={require('../assets/my-qr-removebg-preview.png')} alt="QR Code" />

            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (

    <div className="payment-container">

      <div className="payment-header">
        <div>
          <img className="logo" alt='ERP logo' src={require('../assets/mainlogo.png')} />
        </div>
        <h2> Payment Gateway</h2>
        <h4>(for College Fees)</h4>
      </div>
      <div className="payment-content">

        <div className="payment-left">
          <p>Account number</p>
          <h3>23423523xxxxx</h3>
          <hr />
          <p>Enter amount to pay</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <p>Select a payment method</p>
          <div className="payment-methods">
            <div className={paymentMethod === "debit" ? "selected" : ""} onClick={() => setPaymentMethod("debit")}><i class="fa-solid fa-credit-card"></i>Debit Card</div>
            <div className={paymentMethod === "credit" ? "selected" : ""} onClick={() => setPaymentMethod("credit")}><i class="fa-regular fa-credit-card"></i>Credit Card</div>
            <div className={paymentMethod === "netbanking" ? "selected" : ""} onClick={() => setPaymentMethod("netbanking")}><i class="fa-solid fa-file-invoice-dollar"></i>Netbanking</div>
            <div className={paymentMethod === "wallet" ? "selected" : ""} onClick={() => setPaymentMethod("wallet")}><i class="fa-solid fa-money-check-dollar"></i>Wallet</div>
            <div className={paymentMethod === "upi" ? "selected" : ""} onClick={() => setPaymentMethod("upi")}><i class="fa-solid fa-money-bill"></i>UPI</div>
          </div>
        </div>
        <div className="payment-right">
          <p>Amount payable is</p>
          <h3>₹{amount || "0.00"} only/-</h3>
          {renderPaymentFields()}
          <Link
            to={{
              pathname: "/receipt",
              state: {
                studentData: { /* student details */ },
                paymentData: { paidAmount: amount, paymentMethod },
              },
            }}
          >
            <button className="payment-button">Proceed to Pay</button>
          </Link>

        </div>
        <div className="cut">
          <Link className='profile-link ' to='/Dashboard' state={{ fromDashboard: true }}><i class="fa-solid fa-right-to-bracket"></i></Link>
        </div>
      </div>
      <div className="payment-footer">
        <p>Secure payment processing powered by ModernPay.</p>
      </div>
    </div>
  );
};

export default CollegeFee;
