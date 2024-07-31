import React, { useEffect, useState } from "react";
import adminApis from "../apis/AdminApis";
import { useParams } from "react-router-dom";
import Logo from "../imgs/1.png";
import ToastMessages from "../ToastMessages";

const GameStationProfile = () => {
  const { adminId } = useParams();
  const { stationId } = useParams();
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImages, setShowImages] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    document.title = "PlayWays Admin - Station Profile";
  }, []);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await adminApis.getGameStationData(stationId);
        setStationData(response.data.gameStation);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game station data:", error);
        setLoading(false);
      }
    };

    fetchStationData();

    const interval = setInterval(fetchStationData, 5000);
    return () => clearInterval(interval);
  }, [stationId]);

  const toggleView = (view) => {
    if (view === "images") {
      setShowImages(true);
    } else if (view === "videos") {
      setShowImages(false);
    }
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      await adminApis.updateStatus(adminId, stationId, { status: selectedStatus });
      setToast({
        show: true,
        type: "success",
        message: "Status updated successfully.",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      setToast({
        show: true,
        type: "error",
        message: "Failed to update status. Please try again.",
      });
    }
  };

  const statusOptions = ["Pending", "Rejected", "Allowed"];

  return (
    <div className="container">


      {loading ? (
        <p>Loading...</p>
      ) : (
        stationData && (
          <>
            <div className="row">
              <div className="card bg-golden rounded-4 bg-opacity-50 shadow">
                <div className="card-body text-white">
                  <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                      <img
                        src={`${process.env.REACT_APP_baseUrl}${stationData.gsLogo}` || Logo}
                        alt="Game Station Logo"
                        className="img-fluid rounded-circle"
                        style={{aspectRatio: '1/1', objectFit: 'cover'}}
                      />
                    </div>
                    <div className="col-md-8">
                      <h2>{stationData.name}</h2>
                      <p className="mt-3">Email: {stationData.email}</p>
                      <p>Phone: {stationData.phone}</p>
                      <p>City: {stationData.city}</p>
                      <p>State: {stationData.state}</p>
                      <p>Country: {stationData.country}</p>
                      <p>Latitude: {stationData.latitude}</p>
                      <p>Longitude: {stationData.longitude}</p>
                      <p>Address: {stationData.address}</p>
                      <p>Status: {stationData.status}</p>

                      <select
                        className="form-select mt-3"
                        value={selectedStatus}
                        onChange={handleStatusChange}
                      >
                        <option value="">Select Status</option>
                        {statusOptions.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {/* Button to update status */}
                      <button
                        className="btn btn-primary mt-3"
                        onClick={handleUpdateStatus}
                        disabled={!selectedStatus}
                      >
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
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
                          width={"300px"}
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
                        width="290"
                        height="150"
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
      <ToastMessages
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        type={toast.type}
        message={toast.message}
      />
    </div>
  );
};

export default GameStationProfile;
