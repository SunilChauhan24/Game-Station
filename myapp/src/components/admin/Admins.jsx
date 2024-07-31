import React, { useEffect, useState } from "react";
import adminApis from "../apis/AdminApis";
import { FaEye, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ToastMessages from "../ToastMessages";
import ConfirmationModal from "../ConfirmationModal";
import { Button, Form, Modal } from "react-bootstrap";
import { GridLoader } from "react-spinners";

const Admins = () => {
  const { adminId } = useParams();
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [adminIdToDelete, setAdminIdToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [selectedAdminActivities, setSelectedAdminActivities] = useState([]);
  const [showAdminActivitiesModal, setShowAdminActivitiesModal] =
    useState(false);
  const [newAdminData, setNewAdminData] = useState({
    userName: "",
    email: "",
    password: "",
    isSuperUser: false,
  });
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    document.title = "PlayWays Admin - Admins";
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await adminApis.allAdmins();
      setAdmins(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setLoading(false);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await adminApis.deleteAdmin(adminId, id);
      fetchAdmins();
      setToast({
        show: true,
        type: "success",
        message: "Admin deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting admin:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to delete admin. Please try again.",
      });
    }
  };

  const handleDeleteConfirmation = (id) => {
    setAdminIdToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (adminIdToDelete) {
      deleteAdmin(adminIdToDelete);
      setShowDeleteConfirmation(false);
    }
  };

  const handleAddAdmin = async () => {
    try {
      await adminApis.addAdmin(
        adminId,
        newAdminData.userName,
        newAdminData.email,
        newAdminData.password,
        newAdminData.isSuperUser
      );
      fetchAdmins();
      setToast({
        show: true,
        type: "success",
        message: "Admin added successfully.",
      });
      setShowAddAdminModal(false);
      setNewAdminData({
        userName: "",
        email: "",
        password: "",
        isSuperUser: false,
      });
    } catch (error) {
      console.error("Error adding admin:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to add admin. Please try again.",
      });
    }
  };

  const handleViewAdminActivities = async (id) => {
    try {
      const adminResponse = await adminApis.adminDetails(id);
      const response = await adminApis.fetchRecentActivity(id);
      setSelectedAdminActivities(response.data.activities);
      setShowAdminActivitiesModal(true);
      setAdminName(adminResponse.data.admin.userName);
      console.log();
    } catch (error) {
      console.error("Error fetching admin activities:", error);
    }
  };

  return (
    <>
      <div className="container" id="admins">
        <h1 className="mb-4 ms-1">Admins</h1>

        <button
          className="btn btn-golden"
          title="Add new admin"
          onClick={() => setShowAddAdminModal(true)}
        >
          <FaPlus /> Add Admin
        </button>

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
            <div className="col-md-12 mt-3">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title mb-3">Admin Details</h2>
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>IsSuperUser</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admins.map((admin, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{admin.userName}</td>
                            <td>{admin.email}</td>
                            <td>{admin.isSuperUser ? "true" : "false"}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-transparent mt-1"
                                onClick={() =>
                                  handleViewAdminActivities(admin._id)
                                }
                              >
                                <FaEye className="text-primary" />
                              </button>
                              <button
                                className="btn btn-sm btn-transparent mt-1"
                                onClick={() =>
                                  handleDeleteConfirmation(admin._id)
                                }
                              >
                                <FaTrash className="text-danger" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <Modal
                show={showAdminActivitiesModal}
                onHide={() => setShowAdminActivitiesModal(false)}
                size="lg"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Admin Activities - {adminName}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Activity</th>
                        <th>Action</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAdminActivities.map((activity, index) => (
                        <tr key={index}>
                          <td>{activity.activityType}</td>
                          <td>{activity.actionType}</td>
                          <td>
                            {new Date(activity.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowAdminActivitiesModal(false)}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <Modal
              show={showAddAdminModal}
              onHide={() => setShowAddAdminModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Admin</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newAdminData.userName}
                      onChange={(e) =>
                        setNewAdminData({
                          ...newAdminData,
                          userName: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={newAdminData.email}
                      onChange={(e) =>
                        setNewAdminData({
                          ...newAdminData,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={newAdminData.password}
                      onChange={(e) =>
                        setNewAdminData({
                          ...newAdminData,
                          password: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="isSuperUser">
                    <Form.Check
                      className="mt-2 mb-2"
                      type="checkbox"
                      label="Is Super User"
                      checked={newAdminData.isSuperUser}
                      onChange={(e) =>
                        setNewAdminData({
                          ...newAdminData,
                          isSuperUser: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowAddAdminModal(false)}
                >
                  Close
                </Button>
                <Button variant="golden" onClick={handleAddAdmin}>
                  Add Admin
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        <ConfirmationModal
          isOpen={showDeleteConfirmation}
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this admin user?"
        />
      </div>
      <ToastMessages
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        type={toast.type}
        message={toast.message}
      />
    </>
  );
};

export default Admins;
