import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SideBarAdmin from "../Data/SideBarAdmin";
import "../Assets/CSS/AdminSidebar.css";
import ConfirmationModal from "../ConfirmationModal";
import {
  FaAngleDown,
  FaAngleUp,
  FaBars,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { AdminContext } from "../context/AdminContext";
import { Modal } from "react-bootstrap";
import adminApis from "../apis/AdminApis";

const AdminSidebar = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminData, setAdminData] = useState(null);
  const { logout } = useContext(AdminContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSuperUser, setIsSuperUser] = useState(false);

  const handleSelectItem = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await adminApis.adminDetails(adminId);
        setAdminData(response.data.admin);
        setIsSuperUser(response.data.admin.isSuperUser);
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };

    if (adminId) {
      fetchAdminDetails();
    }
  }, [adminId]);

  useEffect(() => {
    const storedadminId = sessionStorage.getItem("adminId");
    setAdminId(storedadminId);
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
      <nav className="navbar navbar-light bg-golden" id="adminSidebar">
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
            Play Ways Administration
          </span>
          <div className="text-end">
            <button
              className="btn btn-transparent me-3"
              onClick={() => setShowProfileModal(true)}
            >
              <FaUser />
            </button>
          </div>
        </div>
      </nav>
      <div className="container-fluid ">
        <div className="row flex-nowrap">
          {sidebarOpen && (
            <div
              className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary position-relative"
              style={{ overflowY: "auto", maxHeight: "calc(100vh - 33px)" }}
            >
              <div className="d-flex flex-column align-items-center align-items-sm-start  pt-2 min-vh-100">
                <ul
                  className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
                  id="menu"
                >
                  {SideBarAdmin(adminId, isSuperUser).map((item, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to={item.path}
                        className={`nav-link align-middle px-0 w-100 m-1 px-3 text-white ${
                          selectedItem === index ? "selected" : ""
                        }`}
                        onClick={() => {
                          toggleDropdown(index);
                          handleSelectItem(index);
                        }}
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
                      className="nav-link align-middle px-0 px-3 w-100 m-1 text-white"
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
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <img
              src={require("../imgs/Profile_avatar4.png")}
              alt="Profile"
              width={window.innerWidth < 768 ? "180" : "180"}
              className="img-fluid rounded-circle border"
              style={{ filter: "brightness(90%)" }}
            />
          </div>
          {adminData && (
            <div>
              <p>Username: {adminData.userName}</p>
              <p>Email: {adminData.email}</p>
            </div>
          )}
          <div className="text-center mt-5">
            <Link
              to={`/admin/${adminId}/changePassword`}
              className="btn btn-golden mb-2"
            >
              Change Password
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminSidebar;
