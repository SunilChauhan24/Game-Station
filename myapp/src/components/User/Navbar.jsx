import React, { useState } from "react";
import { Dropdown, Nav } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";

const ActiveLink = ({ to, label, isActive }) => (
  <li className={`nav-item ${isActive ? "active" : ""}`}>
    <Link className="nav-link" to={to}>
      {label}
    </Link>
  </li>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeClass, setActiveClass] = useState("");
  const isLoggedIn = localStorage.getItem("userId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Stations", to: "/gameStations" },
    { label: "My Bookings", to: "/bookings" },
    { label: "Blogs", to: "/blogs" },
    { label: "Contact", to: "/contactUs" },
  ];

  const handleActiveLink = (label) => {
    setActiveClass(label);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light sticky-top"
        style={{ zIndex: "10000" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand text-dark ms-5" href="/">
            PlayWays
          </a>
          <button
            className="navbar-toggler me-3"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end ${
              isOpen ? "show" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {isLoggedIn ? (
                <>
                  {navLinks.map((item, index) => (
                    <ActiveLink
                      key={index}
                      to={item.to}
                      label={item.label}
                      isActive={activeClass === item.label}
                      onClick={() => handleActiveLink(item.label)}
                    />
                  ))}

                  <Nav.Item>
                    <Dropdown alignright="true">
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <img
                          src={require("../imgs/Profile_avatar4.png")}
                          alt=""
                          width={30}
                          height={30}
                          className="rounded-circle"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {/* User profile link */}
                        <Dropdown.Item as={Link} to="/profile">
                          My Profile
                        </Dropdown.Item>

                        {/* Divider */}
                        <Dropdown.Divider />

                        {/* Logout button */}
                        <Dropdown.Item onClick={handleLogout}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <ActiveLink
                    to="/signup"
                    label="Register"
                    isActive={activeClass === "Register"}
                  />
                  <ActiveLink
                    to="/login"
                    label="Login"
                    isActive={activeClass === "Login"}
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;