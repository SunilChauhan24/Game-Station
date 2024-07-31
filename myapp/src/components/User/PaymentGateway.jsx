import React, { useState } from "react";

const PaymentGateway = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    // Reset other fields when changing payment method
    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvv("");
    setCardHolder("");
    setUpiId("");
    setUpiId("");
    setAmount("");
    setBankName("");
    setCustomerId("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and handle payment submission based on the selected method
    switch (paymentMethod) {
      case "card":
        console.log(
          "Card Payment submitted:",
          cardNumber,
          expiryMonth,
          expiryYear,
          cvv,
          cardHolder
        );
        // Implement card payment processing logic here
        break;
      case "upi":
        console.log("UPI Payment submitted:", upiId, amount);
        // Implement UPI payment processing logic here
        break;
      case "netbanking":
        console.log(
          "Netbanking Payment submitted:",
          bankName,
          customerId,
          password
        );
        // Implement net banking payment processing logic here
        break;
      case "qr":
        console.log("QR Payment submitted");
        // Implement QR payment processing logic here
        break;
      default:
        break;
    }
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  Card Number:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Enter card number"
                  required
                />
              </div>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label htmlFor="expiryMonth" className="form-label">
                    Expiration Month:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryMonth"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    placeholder="MM"
                    maxLength="2"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="expiryYear" className="form-label">
                    Expiration Year:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryYear"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    placeholder="YYYY"
                    maxLength="4"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="cvv" className="form-label">
                  CVV:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  maxLength="3"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardHolder" className="form-label">
                  Card Holder Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardHolder"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="Cardholder's name"
                  required
                />
              </div>
            </div>
            {/* Other card payment fields */}
          </div>
        );
      case "upi":
        return (
          <div>
            <div className="mb-3">
              <label htmlFor="upiId" className="form-label">
                UPI ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="upiId"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Enter UPI ID"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount:
              </label>
              <input
                type="text"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (optional)"
              />
            </div>
          </div>
        );
      case "netbanking":
        return (
          <div>
            <div className="mb-3">
              <label htmlFor="bankName" className="form-label">
                Bank Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="bankName"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Enter bank name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerId" className="form-label">
                Customer ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter customer ID"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>
        );
      case "qr":
        return (
          <div className="text-center">
            <p>Scan the QR code with your payment app:</p>
            {/* Dummy QR code images for representation */}
            <img
              src={require("../imgs/QR.jpg")}
              alt="Google Pay QR"
              className="img-fluid mb-3"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <div className="card border border-warning-subtle border-1">
        <div className="card-body">
          <h2 className="card-title mb-4">Payment Gateway</h2>

          <div className="mb-3">
            <label className="form-label">Select Payment Method:</label>
            <div
              className="btn-group m-3"
              role="group"
              aria-label="Payment Methods"
            >
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  paymentMethod === "card" ? "active" : ""
                }`}
                onClick={() => handlePaymentMethodChange("card")}
              >
                Card Payment
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  paymentMethod === "upi" ? "active" : ""
                }`}
                onClick={() => handlePaymentMethodChange("upi")}
              >
                UPI Payment
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  paymentMethod === "netbanking" ? "active" : ""
                }`}
                onClick={() => handlePaymentMethodChange("netbanking")}
              >
                Netbanking
              </button>
              <button
                type="button"
                className={`btn btn-outline-primary ${
                  paymentMethod === "qr" ? "active" : ""
                }`}
                onClick={() => handlePaymentMethodChange("qr")}
              >
                QR Payment
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderPaymentFields()}

            <button type="submit" className="btn btn-primary">
              Pay Now
            </button>

            {/* <!--Profile Card 3--> */}
            {/* <div class="col-md-4">
              <div class="card profile-card-3">
                <div class="background-block">
                  <img
                    src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="profile-sample1"
                    class="background"
                  />
                </div>
                <div class="profile-thumb-block">
                  <img
                    src="https://randomuser.me/api/portraits/men/41.jpg"
                    alt="profile-image"
                    class="profile"
                  />
                </div>
                <div class="card-content">
                  <h2>
                    Justin Mccoy<small>Designer</small>
                  </h2>
                  <div class="icon-block">
                    <a href="/">
                      <i class="fa fa-facebook"></i>
                    </a>
                    <a href="/">
                      {" "}
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a href="/">
                      {" "}
                      <i class="fa fa-google-plus"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
