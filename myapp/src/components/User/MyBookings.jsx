import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import userApis from "../apis/UserApis";
import { GridLoader } from "react-spinners";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await userApis.getBookingsOfUser(userId);
        setBookings(response.data.bookings);
      } catch (error) {
        console.log("Error in fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(b.slotDate) - new Date(a.slotDate);
  });

  const handleCancelBooking = async (booking) => {
    try {
      const response = await userApis.findSlotIdfromBookingId(booking._id);
      const slotId = response.data.slot._id;

      await userApis.cancelBooking(booking._id);

      await userApis.updateBookingIdinSlot(slotId, {
        status: "Available",
        bookingid: null,
      });

      const updatedBookings = bookings.filter(
        (item) => item._id !== booking._id
      );
      setBookings(updatedBookings);

      setShowModal(false);
    } catch (error) {
      console.log("Error canceling booking:", error);
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb ms-4 mt-2">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-warning">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  My Bookings
                </li>
              </ol>
            </nav>
          </div>
        </nav>
      </div>
      <div className="container" style={{ minHeight: "60vh" }}>
        <h1 className="text-center display-4 mt-4 mb-5">Bookings</h1>
        {loading ? (
          <div className="row d-flex justify-content-center align-items-center">
            <div className="text-center">
              <GridLoader type="Oval" color="#FFD700" height={50} width={50} />
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-center">No bookings available.</p>
        ) : (
          <div className="p-3 p-md-5">
            {sortedBookings.map((booking) => (
              <div className="card mb-3 shadow" key={booking._id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_baseUrl}${booking.game.image}`}
                      className="img-fluid card-img-top "
                      alt="Game"
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        maxWidth: "350px",
                        maxHeight: "300px",
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h2 className="card-title mb-3">{booking.game.name}</h2>
                      <p className="card-text">
                        <strong>Station:</strong> {booking.gameStationId.name}
                      </p>
                      <p className="card-text">
                        <strong>Date:</strong>{" "}
                        {new Date(booking.slotDate).toLocaleDateString()}
                      </p>
                      <p className="card-text">
                        <strong>Timing:</strong> {booking.slotTiming}
                      </p>

                      <p className="card-text">
                        <strong>Payment Status:</strong> {booking.paymentStatus}
                      </p>

                      <Button
                        variant="golden"
                        onClick={() => handleViewBooking(booking)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Booking Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedBooking && (
              <div>
                <h5>{selectedBooking.game.name}</h5>
                <p>
                  <strong>Station:</strong> {selectedBooking.gameStationId.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedBooking.slotDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Timing:</strong> {selectedBooking.slotTiming}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedBooking.duration} minutes
                </p>
                <p>
                  <strong>Payment Status:</strong>{" "}
                  {selectedBooking.paymentStatus}
                </p>
                <p>
                  <strong>Status:</strong> {selectedBooking.status}
                </p>
                {new Date(selectedBooking.slotDate) > new Date() && (
                  <Button
                    variant="danger"
                    onClick={() => handleCancelBooking(selectedBooking)}
                  >
                    Cancel Booking
                  </Button>
                )}
                {new Date(selectedBooking.slotDate) <= new Date() && (
                  <p className="text-danger">
                    You can cancel this booking before the booking date.
                  </p>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default MyBookings;
