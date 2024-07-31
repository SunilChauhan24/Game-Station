import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import adminApis from "../apis/AdminApis";
import { FaEye } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";

const Payments = () => {
  const { adminId } = useParams();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    document.title = "PlayWays Admin - Payments";
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await adminApis.allPayments();
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error in fetching data: ", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to={`/admin/${adminId}`} className="text-warning">
                Admin
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Payments
            </li>
          </ol>
        </nav>

        <div className="row justify-content-center">
          <div className="col-md-12">
            <h1 className="mb-4">Payments</h1>
            {loading ? (
              <p className="lead text-center">Loading...</p>
            ) : (
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Payment ID</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment.index}>
                      <td>{index + 1}</td>
                      <td>{payment._id}</td>
                      <td>{payment.amount} ₹</td>
                      <td>{payment.status}</td>
                      <td>
                        <button
                          className="btn btn-transparent"
                          onClick={() => openModal(payment)}
                        >
                          <FaEye className="text-primary" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {!loading && payments.length === 0 && (
              <p className="lead text-center">No payments found.</p>
            )}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayment && (
            <div>
              <p>Payment ID: {selectedPayment._id}</p>
              <p>Amount: {selectedPayment.amount} ₹</p>
              <p>Currency: {selectedPayment.currency}</p> 
              <p>RazorOrderPayId: {selectedPayment.razorpay_order_id}</p> 
              <p>RazorpayPaymentId: {selectedPayment.razorpay_payment_id}</p> 
              <p>Status: {selectedPayment.status}</p> 
              {/* Add more payment details as needed */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Payments;
