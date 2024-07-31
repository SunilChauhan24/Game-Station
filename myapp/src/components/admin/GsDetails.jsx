import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import adminApis from "../apis/AdminApis";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ToastMessages from "../ToastMessages";
import ConfirmationModal from "../ConfirmationModal";
import { GridLoader } from "react-spinners";

const GsDetails = () => {
  const { adminId } = useParams();
  const [loading, setLoading] = useState(true);
  const [gameStations, setGameStations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [stationToDelete, setStationToDelete] = useState(null);
  const [stationData, setStationData] = useState({
    name: "",
    host: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    country: "",
    address: "",
    latitude: "",
    longitude: "",
    status: "Pending",
  });
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    document.title = "PlayWays Admin - Gamestations";
  }, []);

  useEffect(() => {
    fetchGameStations();
    const interval = setInterval(fetchGameStations, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchGameStations = async () => {
    try {
      const response = await adminApis.fetchGameStations();
      const data = await response.data;
      setGameStations(data.gameStations);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching game stations:", error);
      setLoading(false);
    }
  };

  const addGameStation = async () => {
    try {
      await adminApis.addGameStations(adminId, stationData);
      fetchGameStations();
      handleClose();
      setToast({
        show: true,
        type: "success",
        message: "Game station added successfully.",
      });
    } catch (error) {
      console.error("Error adding game station:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to add game station. Please try again.",
      });
    }
  };

  const updateGameStation = async () => {
    try {
      await adminApis.updateGameStation(adminId, stationData);
      fetchGameStations();
      handleClose();
      setToast({
        show: true,
        type: "success",
        message: "Game station updated successfully.",
      });
    } catch (error) {
      console.error("Error updating game station:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to update game station. Please try again.",
      });
    }
  };

  const updateGameStationStatus = async (id, status) => {
    try {
      const response = await adminApis.updateStatus(adminId, id, { status });

      if (response.status === 200) {
        const updatedGameStations = gameStations.map((station) => {
          if (station._id === id) {
            return { ...station, status };
          }
          return station;
        });
        setGameStations(updatedGameStations);
        setToast({
          show: true,
          type: "success",
          message: "Game station status updated successfully.",
        });
      } else {
        console.error("Failed to update game station status");
      }
    } catch (error) {
      console.error("Error updating game station status:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to update game station status. Please try again.",
      });
    }
  };

  const deleteGameStation = async (id) => {
    try {
      const response = await adminApis.deleteGameStation(adminId, id);

      if (response.status === 200) {
        const updatedGameStations = gameStations.filter(
          (station) => station._id !== id
        );
        setGameStations(updatedGameStations);
        setToast({
          show: true,
          type: "success",
          message: "Game station deleted successfully.",
        });
      } else {
        console.error("Failed to delete game station");
      }
    } catch (error) {
      console.error("Error deleting game station:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to delete game station. Please try again.",
      });
    }
  };

  const openDeleteConfirmation = (station) => {
    setStationToDelete(station);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (stationToDelete) {
      deleteGameStation(stationToDelete._id);
      setShowDeleteConfirmation(false);
    }
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleOpenModal = (station = {}) => {
    if (station._id) {
      setIsEditing(true);
      setStationData(station);
    } else {
      setIsEditing(false);
      setStationData({
        name: "",
        host: "657bea53c4e5062e0f14e8e4",
        phone: "",
        email: "",
        city: "",
        state: "Gujarat",
        country: "India",
        address: "xyz",
        latitude: "23.0490112",
        longitude: "72.5581824",
        status: "Pending",
      });
    }
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateGameStation();
    } else {
      addGameStation();
    }
  };

  const statusOpt = ["Pending", "Rejected", "Allowed"];
  const statusOptions = ["All", "Pending", "Rejected", "Allowed"];

  const filteredGameStations = gameStations.filter((station) => {
    if (filter === "All") return true;
    return station.status === filter;
  });

  return (
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
            GameStations
          </li>
        </ol>
      </nav>

      <h2 className="text-start mb-4">Game Stations</h2>
      <button className="btn btn-golden mb-3" onClick={() => handleOpenModal()}>
        Add GameStation
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
        <div className="card">
          <div className="card-body">
            <h2 className="card-title mb-3">GameStation details</h2>
            <div className="mb-3">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  className={`btn rounded-5 ${
                    filter === option ? "btn-golden" : "btn-outline-golden"
                  } me-2`}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Location</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGameStations.map((station, index) => (
                  <tr key={station._id}>
                    <td>{index + 1}</td>
                    <td>{station.name}</td>
                    <td>{station.phone}</td>
                    <td>{station.email}</td>
                    <td>{station.city}</td>
                    <td>
                      <select
                        className="form-select"
                        value={station.status}
                        onChange={(e) =>
                          updateGameStationStatus(station._id, e.target.value)
                        }
                      >
                        {statusOpt.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-transparent me-1"
                        onClick={() => handleOpenModal(station)}
                      >
                        <FaPencilAlt className="" />
                      </button>
                      <button
                        className="btn btn-transparent"
                        onClick={() => openDeleteConfirmation(station)}
                      >
                        <FaTrash className="text-danger" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ConfirmationModal
            isOpen={showDeleteConfirmation}
            onCancel={handleCloseDeleteConfirmation}
            onConfirm={handleConfirmDelete}
            message="Are you sure you want to delete this game station?"
          />
          <ToastMessages
            show={toast.show}
            onClose={() => setToast({ ...toast, show: false })}
            type={toast.type}
            message={toast.message}
          />
        </div>
      )}

      <Modal
        title={isEditing ? "Edit Game Station" : "Add Game Station"}
        fields={[
          {
            label: "Name",
            type: "text",
            value: stationData.name,
            onChange: (value) =>
              setStationData({ ...stationData, name: value }),
          },
          {
            label: "Phone",
            type: "text",
            value: stationData.phone,
            onChange: (value) =>
              setStationData({ ...stationData, phone: value }),
          },
          {
            label: "Email",
            type: "text",
            value: stationData.email,
            onChange: (value) =>
              setStationData({ ...stationData, email: value }),
          },
          {
            label: "City",
            type: "text",
            value: stationData.city,
            onChange: (value) =>
              setStationData({ ...stationData, city: value }),
          },
        ]}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        buttonText={stationData._id ? "Update" : "Add"}
        showModal={showModal}
      />
    </div>
  );
};

export default GsDetails;
