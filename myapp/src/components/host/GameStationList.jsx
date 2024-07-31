import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import hostApis from "../apis/HostApis";
import { GridLoader } from "react-spinners";

const GameStationList = () => {
  const [gameStations, setGameStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Allowed");
  const hostId = localStorage.getItem("hostId");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "PlayWays Host - Gamestations";
  });

  useEffect(() => {
    const stationId = localStorage.getItem("selectedStationId");

    if (stationId) {
      navigate(`/host/gameStation/${stationId}`);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (hostId) {
          const response = await hostApis.getStationsByHostId(hostId);

          if (response.data.success) {
            setGameStations(response.data.gameStations);
          } else {
            console.error("Error fetching game stations:", response.data.error);
          }
        }
      } catch (error) {
        console.error("Error fetching game stations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (hostId) {
      fetchData();
    }
  }, [hostId]);

  const handleStationClick = async (stationId, status) => {
    if (status === "Allowed") {
      try {
        const response = await hostApis.getAllGamesOfGs(stationId);
        const games = response.data.games;

        if (games.length > 0) {
          localStorage.setItem("selectedStationId", stationId);
          navigate(`/host/gameStation/${stationId}`);
        } else {
          navigate(`/host/gameStation/${stationId}/games`);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    } else {
      setTimeout(() => {
        navigate(`/host/gameStation/${stationId}`);
      }, 500);
      console.log("This station is not allowed.");
    }
  };

  const filteredStations = gameStations.filter((station) => {
    if (filter === "All") {
      return true;
    } else {
      return station.status === filter;
    }
  });

  return (
    <div className="container mt-2">
      <Link to="/host/addGameStation" className="btn btn-golden mb-4">
        Add New Station
      </Link>

      <div className="mb-3">
        <button
          className="btn btn-outline-golden me-2 btn-lg btn-sm"
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className="btn btn-outline-golden me-2 btn-lg btn-sm"
          onClick={() => setFilter("Allowed")}
        >
          Allowed
        </button>
        <button
          className="btn btn-outline-golden me-2 btn-lg btn-sm"
          onClick={() => setFilter("Rejected")}
        >
          Rejected
        </button>
        <button
          className="btn btn-outline-golden btn-lg btn-sm"
          onClick={() => setFilter("Pending")}
        >
          Show Pending
        </button>
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
        <div className="row row-cols-1 row-cols-md-4 justify-content-center g-4 mt-4 p-4">
          {filteredStations.map((station) => (
            <div key={station._id} className="col">
              <div
                className="card h-100 shadow"
                onClick={() => handleStationClick(station._id, station.status)}
              >
                <img
                  src={`${process.env.REACT_APP_baseUrl}${station.gsLogo}`}
                  className="card-img-top w-100"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                  alt="Game Station Logo"
                />
                <div className="card-body">
                  <h5 className="card-title">{station.name}</h5>
                  <p className="card-text">Email: {station.email}</p>

                  <p className="card-text">
                    Status: <strong>{station.status}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameStationList;
