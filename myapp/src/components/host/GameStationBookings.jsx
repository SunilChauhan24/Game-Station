import React, { useEffect, useState } from "react";
import hostApis from "../apis/HostApis";
import { Link, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const GameStationBookings = () => {
  const { stationId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPastBookings, setShowPastBookings] = useState(false); // State to track past or future bookings

  useEffect(() => {
    document.title = "PlayWays Host - Bookings";
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await hostApis.getAllBookingsOfGs();
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [stationId]);

  const handleCheckBooking = (id) => {
    const booking = bookings.find((booking) => booking._id === id);
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Filter bookings based on past or future bookings
  const filteredBookings = showPastBookings
    ? bookings.filter(
        (booking) =>
          new Date(booking.slotDate) < new Date(new Date().setHours(0, 0, 0, 0))
      )
    : bookings.filter(
        (booking) =>
          new Date(booking.slotDate) >= new Date(new Date().setHours(0, 0, 0, 0))
      );

  return (
    <>
      <div className="container mt-4">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to="/host/gameStations" className="text-warning">
                GameStation
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Bookings
            </li>
          </ol>
        </nav>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-center mb-0">Bookings</h2>
          <div>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => setShowPastBookings(!showPastBookings)}
            >
              {showPastBookings ? "Show New Bookings" : "Show History"}
            </Button>
          </div>
        </div>

        <div
          className="table-responsive"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Booking ID</th>
                <th scope="col">Slot Date</th>
                <th scope="col">User</th>
                <th scope="col">GameStation</th>
                <th scope="col">Game</th>
                <th scope="col">Slot Timing</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(booking.slotDate).toLocaleDateString()}</td>
                  <td>{booking.userId.userName}</td>
                  <td>{booking.gameStationId.name}</td>
                  <td>{booking.game.name}</td>
                  <td>{booking.slotTiming}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleCheckBooking(booking._id)}
                    >
                      Check Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <div>
              <p>
                <strong>Booking ID:</strong> {selectedBooking._id}
              </p>
              <p>
                <strong>Game:</strong> {selectedBooking.game.name}
              </p>
              <p>
                <strong>User:</strong> {selectedBooking.userId.userName}
              </p>
              <p>
                <strong>GameStation:</strong>{" "}
                {selectedBooking.gameStationId.name}
              </p>
              <p>
                <strong>Slot Timing:</strong> {selectedBooking.slotTiming}
              </p>
              <p>
                <strong>Duration:</strong> {selectedBooking.duration} minutes
              </p>
              <p>
                <strong>Booking Time:</strong>{" "}
                {new Date(selectedBooking.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedBooking.status}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameStationBookings;
