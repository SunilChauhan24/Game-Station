import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import adminApis from "../apis/AdminApis";
import { FaArrowRight } from "react-icons/fa";

const HostStations = () => {
  const { adminId } = useParams();
  const { hostId } = useParams();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchStationsByHostId = async () => {
      try {
        const response = await adminApis.getAllGsByHostId(hostId);
        setStations(response.data.gameStations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stations:", error);
        setLoading(false);
      }
    };

    fetchStationsByHostId();

    const interval = setInterval(fetchStationsByHostId, 5000);
    return () => clearInterval(interval);
  }, [hostId]);

  const handleOpenStation = async (stationId) => {
    navigate(`/admin/${adminId}/station/${stationId}`);
  };

  const statusOpt = ["Pending", "Rejected", "Allowed"];
  const statusOptions = ["All", ...statusOpt];

  const filteredStations = stations.filter((station) => {
    if (filter === "All") return true;
    return station.status === filter;
  });

  return (
    <>
      <div className="container">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to={`/admin/${adminId}`} className="text-warning">
                Admin
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/admin/${adminId}/hosts`} className="text-warning">
                Hosts
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              GameStations
            </li>
          </ol>
        </nav>

        <div className="card">
          <div className="card-body">
            <h3 className="mb-4 mt-3">Stations of: {hostId}</h3>
            <div className="mb-3">
            {statusOptions.map((option) => (
                <button
                  key={option}
                  className={`btn btn-outline-golden rounded-5 md-mb-1 me-2 ${
                    filter === option && "active"
                  }`}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStations.map((station) => (
                      <tr key={station._id}>
                        <td>{station._id}</td>
                        <td>{station.name}</td>
                        <td>{station.email}</td>
                        <td>{station.phone}</td>
                        <td>{station.city}</td>
                        <td>{station.state}</td>
                        <td>{station.country}</td>
                        <td>
                          <button
                            onClick={() => handleOpenStation(station._id)}
                            className="btn btn-transparent"
                          >
                            <FaArrowRight className="text-primary w-100"/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HostStations;
