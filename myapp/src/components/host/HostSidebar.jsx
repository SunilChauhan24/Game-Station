import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaAngleDown,
  FaAngleUp,
  FaBars,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import SideBarHost from "../Data/SideBarHost";
import ConfirmationModal from "../ConfirmationModal";
import { HostContext } from "../context/HostContext";

const HostSidebar = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [hostId, sethostId] = useState("");
  const { logout } = useContext(HostContext);

  useEffect(() => {
    const storedHostId = localStorage.getItem("hostId");
    sethostId(storedHostId);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav className="navbar navbar-light bg-golden">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="text-start">
            <button
              className="btn btn-transparent border-0"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <span
            className="navbar-brand text-center mx-auto mb-0 h1"
            style={{ fontFamily: "joshephin" }}
          >
            Host Administration
          </span>
          <div className="text-end"></div>{" "}
        </div>
      </nav>
      <div className="container-fluid ">
        <div className="row flex-nowrap">
          {sidebarOpen && (
            <div
              className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary position-relative"
              style={{ overflowY: "auto", maxHeight: "calc(100vh - 33px)" }}
            >
              <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
                  id="menu"
                >
                  {SideBarHost(hostId).map((item, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to={item.path}
                        className="nav-link align-middle px-0 w-100 m-1 text-white "
                        onClick={() => toggleDropdown(index)}
                        title={item.title}
                      >
                        {item.icon}
                        <span className="ms-2 fs-5 d-none d-sm-inline">
                          {item.title}
                        </span>
                        {Array.isArray(item.subNav) && (
                          <span className="dropdown-icon">
                            {openIndex === index ? (
                              <FaAngleUp />
                            ) : (
                              <FaAngleDown />
                            )}
                          </span>
                        )}
                      </Link>
                      {Array.isArray(item.subNav) && openIndex === index && (
                        <ul className="nav flex-column">
                          {item.subNav.map((subItem, subIndex) => (
                            <li className="nav-item" key={subIndex}>
                              <Link
                                to={subItem.path}
                                className="nav-link align-middle px-0 text-dark"
                                title={subItem.title}
                              >
                                {subItem.icon}
                                <span className="ms-3 d-none d-sm-inline">
                                  {subItem.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </React.Fragment>
                  ))}

                  <li className="nav-item w-100">
                    <Link
                      className="nav-link align-middle px-0 w-100 m-1 text-white"
                      onClick={() => setShowLogoutModal(true)}
                    >
                      <FaSignOutAlt className="md-me-2 text-golden" />
                      <span className="ms-2 fs-5 d-none d-sm-inline">
                        Log Out
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div
            className="col py-3"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 75px)" }}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        message="Are you sure you want to log out?"
      />
    </>
  );
};

export default HostSidebar;
