// import axios from "axios";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HostNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("hostId");
    localStorage.removeItem("isLoggedHostIn");

    setTimeout(() => {
      navigate("/host/login");
    }, 100);
  };

  return (
    <>
      <div className="sticky-top">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <div className="container">
            <Link className="navbar-brand" to="/host/dashboard">
              Play Ways
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/host/gameStationList"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/host/bookings">
                    Bookings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/host/addGameStation"
                  >
                    New GameStation
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default HostNavbar;
