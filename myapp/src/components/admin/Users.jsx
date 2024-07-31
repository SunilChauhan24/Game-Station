import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaPencilAlt, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import adminApis from "../apis/AdminApis";
import { Link, useParams } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import UserProfileModal from "../UserProfileModal";
import ToastMessages from "../ToastMessages";
import Modal from "../Modal";
import "../Assets/CSS/AdminUsers.css";
import { AdminContext } from "../context/AdminContext";
import { GridLoader } from "react-spinners";
// import { useNavigate } from "react-router-dom";

const Users = () => {
  const { adminId } = useParams();
  const { isSuperUser } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserId, setEditedUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    document.title = "PlayWays Admin - Users";
  }, []);

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => {
      fetchUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await adminApis.fetchUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const openModal = (user = {}) => {
    if (user._id) {
      setIsEditing(true);
      setEditedUserId(user._id);
      setUserData(user);
    } else {
      setIsEditing(false);
      setEditedUserId("");
      setUserData({ userName: "", email: "", phone: "", password: "" });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateUser();
    } else {
      addUser();
    }
  };

  const addUser = async () => {
    try {
      await adminApis.addUser(adminId, userData);
      fetchUsers();
      setUserData({ userName: "", email: "", phone: "", password: "" });
      setToast({
        show: true,
        type: "success",
        message: "User added successfully.",
      });
      // console.log(userData);
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: "Failed to add user. Please try again.",
      });
      console.error("Error adding user:", error);
    }
  };

  const editUser = (id, user) => {
    setUserData(user);
    setIsEditing(true);
    setEditedUserId(id);
    setShowModal(true);
  };

  const updateUser = async () => {
    try {
      await adminApis.updateUser(adminId, editedUserId, userData);
      fetchUsers();
      setUserData({ userName: "", email: "", phone: "", password: "" });
      setIsEditing(false);
      setToast({
        show: true,
        type: "success",
        message: "User updated successfully.",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to update user. Please try again.",
      });
    }
  };

  const deleteUser = async (id) => {
    try {
      await adminApis.deleteUser(adminId, id);
      fetchUsers();
      setToast({
        show: true,
        type: "success",
        message: "User deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to delete user. Please try again.",
      });
    }
  };

  const handleDeleteConfirmation = (id) => {
    setUserIdToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      deleteUser(userIdToDelete);
      setShowDeleteConfirmation(false);
    }
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredUsers = users.filter(
        (user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toString().includes(searchTerm.toLowerCase()) ||
          user._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers);
    }
  };

  useEffect(() => {
    const handleSearch = () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
      } else {
        const filteredUsers = users.filter(
          (user) =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.toString().includes(searchTerm.toLowerCase()) ||
            user._id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredUsers);
      }
    };

    handleSearch();
  }, [searchTerm, users, setSearchResults]);

  return (
    <>
      <div className="container" id="users">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to={`/admin/${adminId}`} className="text-warning">
                Admin
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Users
            </li>
          </ol>
        </nav>

        <h1 className="mb-4 ms-1">Users</h1>

        <div className="row mb-2">
          {isSuperUser && (
            <>
              <div className="text-start">
                <button
                  className="btn btn-golden"
                  title="Add new user"
                  onClick={openModal}
                >
                  <FaPlus /> Add User
                </button>
              </div>
            </>
          )}

          <Modal
            title={isEditing ? "Edit User" : "Add User"}
            fields={[
              {
                label: "Name",
                type: "text",
                value: userData.userName,
                onChange: (value) =>
                  setUserData({ ...userData, userName: value }),
              },
              {
                label: "Email",
                type: "text",
                value: userData.email,
                onChange: (value) => setUserData({ ...userData, email: value }),
              },
              {
                label: "Phone",
                type: "text",
                value: userData.phone,
                onChange: (value) => setUserData({ ...userData, phone: value }),
              },
              {
                label: "Password",
                type: "text",
                value: userData.password,
                onChange: (value) =>
                  setUserData({ ...userData, password: value }),
              },
            ]}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            buttonText={isEditing ? "Update User" : "Add User"}
            showModal={showModal}
          />
        </div>

        {loading ? (
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }}
          >
            <div className="col-md-1 text-center justify-content-center">
              <GridLoader type="Oval" color="#FFD700" height={50} width={50} />
            </div>
          </div>
        ) : (
          <div className="row">
            {/* First Row */}
            <div className="col-md-12">
              <div className="row">
                {/* Search */}
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title mb-3"> Search</h2>
                      <div className="mb-3">
                        <div className="row">
                          <div className="col-md-10">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search by Email, Name, Phone, UserId"
                              value={searchTerm}
                              onChange={handleSearchChange}
                            />
                          </div>
                          <div className="col-md-2 mt-md-0 mt-2">
                            <button
                              className="btn btn-golden"
                              onClick={handleSearch}
                              title="Search"
                            >
                              <FaSearch />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="col-md-12 mt-3">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title mb-3">User Details</h2>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>IsPrimeUser</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(searchTerm.trim() === "" ? users : searchResults).map(
                          (user, index) => (
                            <tr key={index} style={{ maxHeight: "10px" }}>
                              <td>{index + 1}</td>
                              <td>{user.userName}</td>
                              <td
                                style={{ maxWidth: "150px", overflowX: "auto" }}
                              >
                                {user.email}
                              </td>
                              <td>{user.IsPrimeUser ? "Yes" : "No"}</td>
                              <td>
                                <div className="row justify-content-center">
                                  <div className="col">
                                    <button
                                      className="btn btn-sm btn-transparent mt-1"
                                      onClick={() => handleViewProfile(user)}
                                    >
                                      <FaEye className="text-primary" />
                                    </button>
                                  </div>
                                  <div className="col">
                                    <button
                                      className="btn btn-sm btn-transparent mt-1"
                                      onClick={() => editUser(user._id, user)}
                                    >
                                      <FaPencilAlt className="" />
                                    </button>
                                  </div>
                                  {isSuperUser && (
                                    <>
                                      <div className="col">
                                        <button
                                          className="btn btn-sm btn-transparent mt-1"
                                          onClick={() =>
                                            handleDeleteConfirmation(user._id)
                                          }
                                        >
                                          <FaTrash className="text-danger" />
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <ToastMessages
              show={toast.show}
              onClose={() => setToast({ ...toast, show: false })}
              type={toast.type}
              message={toast.message}
            />
          </div>
        )}

        {showUserModal && selectedUser && (
          <UserProfileModal
            show={showUserModal}
            userData={selectedUser}
            onClose={() => setShowUserModal(false)}
          />
        )}
      </div>
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this user?"
      />
    </>
  );
};

export default Users;
