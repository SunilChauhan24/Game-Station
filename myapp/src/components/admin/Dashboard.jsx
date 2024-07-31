import React, { useState, useEffect } from "react";
// import Modal from "../Modal";
import adminApis from "../apis/AdminApis";
import { Link, useParams } from "react-router-dom";
import "../Assets/CSS/AdminDashboard.css";
import {
  FaCog,
  FaGamepad,
  FaLaptop,
  FaPencilAlt,
  FaSyncAlt,
  FaTrash,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import ToastMessages from "../ToastMessages";

const Dashboard = () => {
  const { adminId } = useParams();
  const [users, setUsers] = useState([]);
  const [emailRecipient, setEmailRecipient] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalGameStations, setTotalGameStations] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [totalHosts, setTotalHosts] = useState(0);
  const [activities, setActivities] = useState([]);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchGameStations();
    fetchGames();
    fetchHosts();

    const interval = setInterval(() => {
      fetchUsers();
      fetchGameStations();
      fetchGames();
      fetchHosts();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "PlayWays Admin - Dashboard";
  }, []);

  useEffect(() => {
    setTotalUsers(users.length);
  }, [users]);

  const handleRecipientChange = (e) => {
    setEmailRecipient(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setEmailSubject(e.target.value);
  };

  const handleContentChange = (e) => {
    setEmailContent(e.target.value);
  };

  const fetchUsers = async () => {
    try {
      const response = await adminApis.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await adminApis.fetchGames();
      setTotalGames(response.data.games.length);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchGameStations = async () => {
    try {
      const response = await adminApis.fetchGameStations();
      setTotalGameStations(response.data.gameStations.length);
    } catch (error) {
      console.error("Error fetching game stations:", error);
    }
  };

  const fetchHosts = async () => {
    try {
      const response = await adminApis.fetchHosts();
      setTotalHosts(response.data.hosts.length);
    } catch (error) {
      console.error("Error fetching game stations:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await adminApis.sendEmail(
        adminId,
        emailRecipient,
        emailSubject,
        emailContent
      );
      if (response.status === 200) {
        setToast({
          show: true,
          type: "success",
          message: "Email sent successfully.",
        });
        setEmailRecipient("");
        setEmailSubject("");
        setEmailContent("");
      } else {
        setToast({
          show: true,
          type: "error",
          message: "Failed to send email. Please try again.",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setToast({
          show: true,
          type: "error",
          message: "Unauthorized",
        });
      } else {
        console.error("Error sending email:", error);
        setToast({
          show: true,
          type: "error",
          message: "Failed to send email. Please try again.",
        });
      }
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await adminApis.fetchRecentActivity(adminId);
        setActivities(response.data.activities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    fetchActivities();
  }, [adminId]);

  return (
    <>
      <div className="container" id="dashboard">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to={`/admin/${adminId}`} className="text-warning">
                Admin
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </nav>

        <h1 className="mb-4">Dashboard</h1>

        {/* cards */}
        <div className="row mb-5">
          <div className="col-md-3 md-mb-0 mb-2">
            <div className="card h-100 bg-golden bg-opacity-75 shadow">
              <div className="card-body text-center">
                <div className="row">
                  <div className="col-md-8 text-white">
                    <h1 className="card-title">{totalUsers}</h1>
                    <p className="card-text">Total Users</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-center justify-content-center text-center ">
                    <Link to={`/admin/${adminId}/users`} className="btn btn-light btn-lg">
                      <FaUser />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-md-3 md-mb-0 mb-2">
            <div className="card h-100 bg-golden bg-opacity-75 shadow">
              <div className="card-body text-center">
                <div className="row">
                  <div className="col-md-8 text-white">
                    <h1 className="card-title">{totalHosts}</h1>
                    <p className="card-text">Total Hosts</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-center justify-content-center text-center">
                    <Link to={`/admin/${adminId}/hosts`} className="btn btn-light btn-lg">
                      <FaUserTie />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-md-3 md-mb-0 mb-2">
            <div className="card h-100 bg-golden bg-opacity-75 shadow">
              <div className="card-body text-center">
                <div className="row">
                  <div className="col-md-8 text-white">
                    <h1 className="card-title">{totalGames}</h1>
                    <p className="card-text">Total Games</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-center justify-content-center text-center">
                    <Link to={`/admin/${adminId}/games`} className="btn btn-light btn-lg">
                      <FaGamepad />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" col-md-3 md-mb-0 mb-2">
            <div className="card h-100 bg-golden bg-opacity-75 shadow">
              <div className="card-body text-center">
                <div className="row">
                  <div className="col-md-8 text-white">
                    <h1 className="card-title">{totalGameStations}</h1>
                    <p className="card-text">Total GameStations</p>
                  </div>
                  <div className="col-md-4 d-flex align-items-center justify-content-center text-center">
                    <Link
                      to={`/admin/${adminId}/gameStations`}
                      className="btn btn-light btn-lg"
                    >
                      <FaLaptop />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3 m-md-2 m-0">
          <div className="col-md-8">
            <h2>Email</h2>
            <div className="card" style={{ minHeight: "500px" }}>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-3">
                    <label htmlFor="recipient">To</label>
                    <input
                      type="text"
                      id="recipient"
                      className="form-control"
                      value={emailRecipient}
                      placeholder="Enter recipient email"
                      onChange={handleRecipientChange}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="form-control"
                      value={emailSubject}
                      placeholder="Enter email subject"
                      onChange={handleSubjectChange}
                    />
                  </div>
                  <div className="form-outline mb-3">
                    <label htmlFor="content">Content</label>
                    <textarea
                      id="content"
                      className="form-control"
                      rows="5"
                      value={emailContent}
                      placeholder="Enter email content"
                      onChange={handleContentChange}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-golden"
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Email"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4 mt-md-0 mt-5 ">
            <h2>Activity</h2>
            <div
              className="card h-100"
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              {activities.length > 0 ? (
                <div className="card-body">
                  {activities.map((activity, index) => (
                    <div key={index} className="card mb-2">
                      <div className="card-body">
                        <div className=" d-flex align-items-center justify-content-center">
                          <div className="">
                            {activity.actionType === "add" && (
                              <FaPencilAlt className="text-success fs-3" />
                            )}
                            {activity.actionType === "update" && (
                              <FaSyncAlt className="text-warning fs-3" />
                            )}
                            {activity.actionType === "delete" && (
                              <FaTrash className="text-danger fs-3" />
                            )}
                            {activity.actionType === "other" && (
                              <FaCog className="text-secondary fs-3" />
                            )}
                          </div>
                          <div className="col-md-9">
                            <h6>{activity.activityType}</h6>
                            <small>
                              {new Date(activity.timestamp).toLocaleString()}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card-body text-center">
                  No activities available
                </div>
              )}
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
    </>
  );
};

export default Dashboard;
