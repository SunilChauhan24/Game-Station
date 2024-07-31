import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import hostApis from "../apis/HostApis";

const GameStationPayment = () => {
  const { stationId } = useParams();
  const [payments, setPayments] = useState([]);
  const [bankDetails, setBankDetails] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    document.title = "PlayWays Host - Payments";
  });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await hostApis.allPayments(stationId);
        setPayments(response.data);
        calculateTotalAmount(response.data);
      } catch (error) {
        console.log("Error in fetching payments : ", error);
      }
    };

    fetchPayments();
  }, [stationId]);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await hostApis.getBankDetails(stationId);
        setBankDetails(response.data.bankDetails);
      } catch (error) {
        console.log("Error in fetching payments : ", error);
      }
    };

    fetchBankDetails();
  }, [stationId]);

  const calculateTotalAmount = (payments) => {
    const total = payments.reduce((acc, payment) => acc + payment.amount, 0);
    setTotalAmount(total);
  };

  const maskAccountNumber = (accountNumber) => {
    if (accountNumber) {
      const lastFourDigits = accountNumber.slice(-4);
      const masked = "*".repeat(accountNumber.length - 4) + lastFourDigits;
      return masked;
    } else {
      return "";
    }
  };

  return (
    <>
      <div className="container">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to="/host/gameStations" className="text-warning">
                GameStation
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Payments
            </li>
          </ol>
        </nav>

        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5>Total Amount</h5>
                <h1 className="display-3">
                  {totalAmount} <span className="h5">₹ INR</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="col-md-6 ">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="mb-">Bank Details</h5>
                <h6 className="mb-">
                  <b>Account Number : </b>
                  {maskAccountNumber(bankDetails.accountNumber)}
                </h6>
                <h6 className="mb-">
                  <b>Bank : </b>
                  {bankDetails.bankName}
                </h6>
                <Link
                  to={`/host/gameStation/${stationId}/bankDetails`}
                  className="btn btn-golden "
                >
                  Add Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="mb-4">All Payments</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Payment ID</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Currency</th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment, index) => (
                      <tr key={payment._id}>
                        <td>{index + 1}</td>
                        <td>{payment._id}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.currency}</td>
                        {/* Add more table cells as needed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameStationPayment;
