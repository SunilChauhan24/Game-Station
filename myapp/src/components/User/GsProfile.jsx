import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userApis from "../apis/UserApis";
import Logo from "../imgs/Logo.png";
import { FaArrowLeft, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const GsProfile = () => {
  const { stationId } = useParams();
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImages, setShowImages] = useState(true);
  const [gameCount, setGameCount ] = useState(0)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    document.title = "Play Ways - GameStation Profile";
  }, []);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await userApis.getGameStationData(userId, stationId);
        setStationData(response.data.gameStation);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game station data:", error);
        setLoading(false);
      }
    };

    fetchStationData();
  }, [stationId, userId]);

  useEffect(() => {
    const fetchGamesofGs = async() => {
      try {
        const response = await userApis.getAllGamesOfGs(stationId);
        setGameCount(response.data.games.length);
      } catch (error) {
        console.log(error);
      }
    }

    fetchGamesofGs();
  },[stationId])

  const toggleView = (view) => {
    if (view === "images") {
      setShowImages(true);
    } else if (view === "videos") {
      setShowImages(false);
    }
  };

  const handleMapClick = () => {
    if (stationData && stationData.latitude && stationData.longitude) {
      const mapUrl = `https://maps.google.com/?q=${stationData.latitude},${stationData.longitude}`;
      window.open(mapUrl, "_blank");
    }
  };

  const handlePhoneClick = () => {
    const openDialer = (phoneNumber) => {
      const telLink = `tel:${phoneNumber}`;
      window.open(telLink, "_blank");
    };

    if (stationData && stationData.phone) {
      openDialer(stationData.phone);
    }
  };


  return (
    <>
      <div className="container mt-3">
        {loading ? (
          <p>Loading...</p>
        ) : (
          stationData && (
            <>
              <div className="row p-md-0 p-3">
                <div className="card bg-golden rounded-4 bg-opacity-50 shadow ">
                  <div className="card-body text-white">
                    <div className="row mb-3">
                      <div className="col-12">
                        <div className="row align-items-center justify-content-between">
                          <div className="col-4 col-md-6">
                            <div className="text-start">
                              <Link
                                to={`/gameStation/${stationId}/games`}
                                className="text-white"
                              >
                                <FaArrowLeft className="fs-5" />
                              </Link>
                            </div>
                          </div>
                          <div className="col-8 col-md-6">
                            <div className="text-end">
                              <Link
                                title="Call game station"
                                className="text-white me-2"
                                onClick={handlePhoneClick}
                              >
                                <FaPhoneAlt className="fs-5" />
                              </Link>
                              <Link
                                title="Show station on map"
                                className="text-white me-2"
                                onClick={handleMapClick}
                              >
                                <FaMapMarkerAlt className="fs-5" />
                              </Link>
                            </div>
                          </div>
                        </div>
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
                              `${process.env.REACT_APP_baseUrl}${stationData.gsLogo}` ||
                              Logo
                            }
                            alt="Game Station Logo"
                            className="img-fluid rounded-circle border-dark border"
                            width={window.innerWidth < 768 ? "150" : "600"}
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
                                {stationData.viewers}
                              </h5>
                            </div>
                            <div
                              className="col-6 text-center"
                              style={{ userSelect: "none" }}
                            >
                              <label className="fs-4" htmlFor="status">
                                Games
                              </label>
                              <h5 className="text-uppercase" id="status">
                                {gameCount}
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                            alt="Images"
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
      </div>
    </>
  );
};

export default GsProfile;
