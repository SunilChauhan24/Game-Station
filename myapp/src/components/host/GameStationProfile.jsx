import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../imgs/1.png";
import { FaEllipsisV, FaMapMarkerAlt } from "react-icons/fa";
import "../Assets/CSS/HostGSProfile.css";
import hostApis from "../apis/HostApis";
import ConfirmationModal from "../ConfirmationModal";
import { GridLoader } from "react-spinners";
import "../Assets/CSS/Host.css"

const GameStationProfile = () => {
  const { stationId } = useParams();
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImages, setShowImages] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PlayWays Host - Gamestation Profile";
  });

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await hostApis.getGameStationData(stationId);
        setStationData(response.data.gameStation);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game station data:", error);
        setLoading(false);
      }
    };

    fetchStationData();
  }, [stationId]);

  const fetchStationData = async () => {
    try {
      const response = await hostApis.getGameStationData(stationId);
      setStationData(response.data.gameStation);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching game station data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".options-menu")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleView = (view) => {
    if (view === "images") {
      setShowImages(true);
    } else if (view === "videos") {
      setShowImages(false);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSetTimingClick = () => {
    navigate(`/host/gameStation/${stationId}/addTiming`);
  };

  const handleUpdateDetails = () => {
    navigate(`/host/gameStation/${stationId}/updateProfile`);
  };

  const handleImageUpload = async (event) => {
    if (!event) {
      document.getElementById("imageUploadInput").click();
      return;
    }

    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", imageFile);

    try {
      await hostApis.addImage(stationId, formData);
      fetchStationData();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleVideoUpload = async (event) => {
    if (!event) {
      document.getElementById("videoUploadInput").click();
      return;
    }

    const videoFile = event.target.files[0];
    const formData = new FormData();
    formData.append("videoFile", videoFile);

    try {
      await hostApis.addVideo(stationId, formData);
      fetchStationData();
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setIsDropdownOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await hostApis.deleteGameStation(stationId);
      localStorage.removeItem("selectedStationId");
      navigate("/host/");
    } catch (error) {
      console.error("Error deleting game station:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleLocationClick = () => {
    if (stationData && stationData.latitude && stationData.longitude) {
      const url = `https://www.google.com/maps?q=${stationData.latitude},${stationData.longitude}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="container mt-3">
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
        stationData && (
          <>
            <div className="row">
              <div className="card bg-golden rounded-4 bg-opacity-50 shadow">
                <div className="card-body text-white">
                  <div className="row">
                    <div className="text-end position-relative  d-flex align-items-center justify-content-end mb-2">
                      <div className="me-3" onClick={handleLocationClick}>
                        <FaMapMarkerAlt className="me-2" />
                      </div>
                      <div className="" onClick={(e) => toggleDropdown(e)}>
                        <FaEllipsisV style={{ cursor: "pointer" }} />
                      </div>
                      {isDropdownOpen && (
                        <div
                          className="options-menu text-dark position-absolute top-100 end-0"
                          style={{ zIndex: "999" }}
                        >
                          <ul>
                            <li onClick={(e) => handleImageUpload()}>
                              Add Image
                            </li>
                            <li onClick={(e) => handleVideoUpload()}>
                              Add Video
                            </li>
                            <li onClick={() => handleUpdateDetails()}>
                              Update Details
                            </li>
                            <li onClick={() => handleDeleteClick()}>
                              Delete Station
                            </li>
                            <li onClick={() => handleSetTimingClick()}>
                              Set Timing
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                      <div
                        className="bg-white rounded-circle"
                        style={{ userSelect: "none" }}
                      >
                        <img
                          src={
                            stationData.gsLogo
                              ? `${process.env.REACT_APP_baseUrl}${stationData.gsLogo}`
                              : Logo
                          }
                          alt="Game Station Logo"
                          className="img-fluid rounded-circle border-dark border"
                          width={window.innerWidth < 768 ? "150" : "580"}
                          style={{ aspectRatio: "1/1", objectFit: "cover" }}
                        />
                      </div>
                    </div>
                    <div className="col-md-8 justify-content-center align-items-center d-flex">
                      <div className="row justify-content-center mt-3">
                        <div className="text-center">
                          <h1
                            className="fw-bolder text-uppercase"
                            style={{ userSelect: "none" }}
                          >
                            {stationData.name}
                          </h1>
                          <span style={{ userSelect: "none" }}>
                            {stationData.city}
                          </span>
                        </div>
                        <div className="row justify-content-center d-flex mt-md-5 mb-2 mt-3">
                          <div
                            className="col-6 text-center"
                            style={{ userSelect: "none" }}
                          >
                            <label className="fs-4" htmlFor="visits">
                              Viewers
                            </label>
                            <h5 className="text-uppercase" id="visits">
                              {stationData.viewers ? stationData.viewers : "00"}
                            </h5>
                          </div>
                          <div
                            className="col-6 text-center"
                            style={{ userSelect: "none" }}
                          >
                            <label className="fs-4" htmlFor="status">
                              Status
                            </label>
                            <h5 className="text-uppercase" id="status">
                              {stationData.status}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="imageUploadInput"
              multiple={false}
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              style={{ display: "none" }}
              id="videoUploadInput"
              multiple={false}
            />
            <div className="row mt-3">
              <div className="col-md-12 text-center">
                <button
                  className={`btn me-3 ${
                    showImages ? "btn-golden" : "btn-secondary"
                  }`}
                  onClick={() => toggleView("images")}
                >
                  Images
                </button>
                <button
                  className={`btn ${
                    showImages ? "btn-secondary" : "btn-golden"
                  }`}
                  onClick={() => toggleView("videos")}
                >
                  Videos
                </button>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                {showImages ? (
                  stationData.images && stationData.images.length > 0 ? (
                    <div className="image-container">
                      {stationData.images.map((image, index) => (
                        <img
                          key={index}
                          src={`${process.env.REACT_APP_baseUrl}${image}`}
                          alt="Iamges"
                          className="img-fluid"
                          width={window.innerWidth < 768 ? "150" : "300"}
                          style={{ aspectRatio: "1/1", objectFit: "cover" }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p>No images available</p>
                  )
                ) : stationData.videos && stationData.videos.length > 0 ? (
                  <div className="video-container w-100">
                    {stationData.videos.map((video, index) => (
                      <iframe
                        key={index}
                        src={`${process.env.REACT_APP_baseUrl}${video}`}
                        title={`Videos`}
                        width={window.innerWidth < 768 ? "290" : "600"}
                        height={window.innerWidth < 768 ? "150" : "280"}
                        frameBorder="0"
                        className="m-1"
                        allowFullScreen
                      ></iframe>
                    ))}
                  </div>
                ) : (
                  <p>No videos available</p>
                )}
              </div>
            </div>
          </>
        )
      )}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this game station?"
      />
      {/* <ToastMessages
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        type={toast.type}
        message={toast.message}
      /> */}
    </div>
  );
};

export default GameStationProfile;
