import React, { useEffect, useState } from "react";
import adminApis from "../apis/AdminApis";
import { Link, useParams } from "react-router-dom";
import "../Assets/CSS/AdminBookings.css";
import { GridLoader } from "react-spinners";

const Bookings = () => {
  const { adminId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    document.title = "PlayWays Admin - Bookings";
  }, []);


  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await adminApis.fetchBookings();
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();

    const interval = setInterval(fetchBookings, 2000);
    return () => clearInterval(interval);
  }, []);

  const filterBookings = (status) => {
    if (status === "all") {
      setFilter("all");
      return;
    }
    setFilter(status);
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  return (
    <div className="container" id="booking">
      {/* Sitemap Path */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mt-2">
          <li className="breadcrumb-item">
            <Link to={`/admin/${adminId}`} className="text-warning">
              Admin
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Bookings
          </li>
        </ol>
      </nav>

      <h1 className="mt-4 mb-4">Bookings</h1>
      <div className="card">
        <div className="card-body">
          <div className="mb-3">
            <button
              className={`btn btn-outline-golden rounded-5 md-mb-1 me-2 ${
                filter === "all" && "active"
              }`}
              onClick={() => filterBookings("all")}
            >
              All
            </button>
            <button
              className={`btn btn-outline-golden rounded-5 md-mb-1 me-2 ${
                filter === "confirmed" && "active"
              }`}
              onClick={() => filterBookings("confirmed")}
            >
              Confirmed
            </button>
            <button
              className={`btn btn-outline-golden rounded-5 md-mb-1 me-2 ${
                filter === "pending" && "active"
              }`}
              onClick={() => filterBookings("pending")}
            >
              Pending
            </button>
            <button
              className={`btn btn-outline-golden rounded-5 md-mb-1 me-2 ${
                filter === "rejected" && "active"
              }`}
              onClick={() => filterBookings("rejected")}
            >
              Rejected
            </button>
          </div>

          {loading ? (
            <div
            className="row d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }}
          >
            <div className="col-md-1 text-center justify-content-center">
              <GridLoader
                type="Oval"
                color="#FFD700"
                height={50}
                width={50}
              />
            </div>
          </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Slot Date</th>
                    <th>Slot Time</th>
                    <th>Duration</th>
                    <th>Game Station</th>
                    <th>Status</th>
                    <th>Game</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td>{index+1}</td>
                      <td>{booking.userId.userName}</td>
                      <td>{new Date(booking.slotDate).toLocaleDateString()}</td>
                      <td>{booking.slotTiming}</td>
                      <td>{booking.duration}</td>
                      <td>{booking.gameStationId.name}</td>
                      <td>{booking.status}</td>
                      <td>{booking.game.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
