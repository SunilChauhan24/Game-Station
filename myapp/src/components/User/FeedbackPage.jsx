import React, { useEffect, useState } from "react";
import userApis from "../apis/UserApis";
import { Link } from "react-router-dom";

const FeedbackPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userApis.submitFeedback(formData);
      setSuccess("Feedback submitted successfully");
      setError("");
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(true);
      setTimeout(() => {
        setSuccess("");
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setError("An error occurred while submitting feedback");
      setSuccess("");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  useEffect(() => {
    document.title = "Play Ways - Feedback";
  }, []);

  return (
    <div>
      {/* Image with Heading */}
      <div className="position-relative">
        <img
          src={require("../imgs/feedback.jpg")}
          alt="Feedback"
          className="img-fluid w-100 h-50"
          style={{
            minHeight: "60vh",
            aspectRatio: "16/3",
            objectFit: "cover",
            filter: "brightness(50%)",
          }}
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1
            className="text-white text-lg text-sm text-xs responsive-text animate__animated animate__fadeInDown"
            style={{ fontSize: "60px", fontFamily: "satisfya" }}
          >
            Feedback Page
          </h1>
          <p className="text-white mt-4 animate__animated animate__fadeInDown">
            We value your feedback! Please let us know how we can improve our
            services.
          </p>
        </div>
      </div>

      <div className=" ">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb ms-4 mt-2">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-warning">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Feedback
                </li>
              </ol>
            </nav>
          </div>
        </nav>
      </div>

      {/* Feedback Form */}
      <div className="container py-5">
        {submitted ? (
          <div className="row justify-content-center">
            <div className="col-md-7 mb-3 d-flex justify-content-center align-items-center " style={{minHeight: "70vh"}}>
              <div className="card border-0 w-100 h-100">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-7 mb-3 d-flex justify-content-center align-items-center">
              <div className="card border-0 w-100">
                <div className="card-body">
                  <div className="row">
                    <h1 className="text-center mb-4">Feedback Form</h1>
                    <div className="p-3">
                      {error && (
                        <div className="alert alert-danger mt-2" role="alert">
                          {error}
                        </div>
                      )}
                      {success && (
                        <div className="alert alert-success mt-2" role="alert">
                          {success}
                        </div>
                      )}
                    </div>

                    <div className="col-md-12">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">
                            Your Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Your Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="message" className="form-label">
                            Your Feedback
                          </label>
                          <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            value={message}
                            onChange={handleChange}
                            placeholder="Your Feedback"
                            required
                          ></textarea>
                        </div>
                        <div className="text-center mt-4">
                          <button type="submit" className="btn btn-golden">
                            Submit Feedback
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-3 ">
          <div className="col-md-6 d-flex align-items-center justify-content-center ">
            <div className="text-start">
              <p>
                Thank you for taking the time to provide your valuable feedback
                to Playways. We appreciate your input and strive to improve our
                services based on your suggestions.
              </p>
              <p>
                Your feedback helps us understand our users better and allows us
                to enhance your experience with our platform. We are committed
                to delivering the best possible service, and your opinions play
                a crucial role in our continuous improvement efforts.
              </p>
              <p>
                If you have any additional comments or suggestions, please feel
                free to reach out to us at feedback@playways.com. We value your
                feedback and look forward to hearing from you!
              </p>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src={require("../imgs/illustrations/Feedback.png")}
              alt="feedback"
              className="img-fluid rounded-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
