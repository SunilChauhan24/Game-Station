import React, { useState, useEffect } from "react";
import adminApis from "../apis/AdminApis";
import { Link, useParams } from "react-router-dom";
import { GridLoader } from "react-spinners";

const Feedbacks = () => {
  const { adminId } = useParams();
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    document.title = "PlayWays Admin - Feedback";
  }, []);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await adminApis.getAllFeedback();
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();

    const interval = setInterval(fetchFeedbacks, 2000);
    return () => clearInterval(interval);
  }, []);

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
            <li className="breadcrumb-item active" aria-current="page">
              Feedbacks
            </li>
          </ol>
        </nav>

        <h1 className="my-4">Feedbacks</h1>
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
            {feedbacks.map((feedback, index) => (
              <div className="col-md-6" key={index}>
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{feedback.name}</h5>
                    <p className="card-text">{feedback.email}</p>
                    <p className="card-text">{feedback.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Feedbacks;
