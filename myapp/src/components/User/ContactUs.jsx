import React, { useEffect, useState } from "react";
import { FaAt, FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import userApis from "../apis/UserApis";
import { GridLoader } from "react-spinners";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApis.contactUs(
        formData.name,
        formData.email,
        formData.subject,
        formData.message
      );
      setLoading(false);
      setShowThanks(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => {
        setShowThanks(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Error submitting message:", error);
      setErrorMessage("Failed to send message. Please try again later.");
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
    }
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+911234567890";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:playways83@gmail.com";
  };

  const handleFacebookClick = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=61555468633232&mibextid=ZbWKwL",
      "_blank"
    );
  };

  useEffect(() => {
    document.title = "Play Ways - ContactUs";
  }, []);

  return (
    <>
      <div>
        <div className="">
          {/* Image with Heading */}
          <div className="position-relative">
            <img
              src={require("../imgs/contactUsbg.avif")}
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
                className="text-white animate__animated animate__fadeInDown"
                style={{ fontSize: "60px", fontFamily: "satisfya" }}
              >
                Contact Us
              </h1>
              <p className="text-white mt-4 animate__animated animate__fadeInDown ">
                Feel free to reach out to us with any questions, concerns, or
                feedback. We strive to respond to all inquiries promptly and
                provide the best possible support.
              </p>
            </div>
          </div>

          {/* Sitemap Path */}
          <div className="">
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
                      Contact Us
                    </li>
                  </ol>
                </nav>
              </div>
            </nav>
          </div>

          {/* Contact Form */}
          <div className="container">
            <div
              className="row justify-content-center align-items-center p-md-0 p-4"
              style={{ minHeight: "70vh" }}
            >
              <div className="col-md-3 p-3 justify-content-center">
                <div className="card contactUs-card shadow">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <FaPhoneAlt className="fs-2 rounded-circle text-golden" />
                      <h4 className="text-golden card-title mt-5">
                        Give us a Call
                      </h4>
                      <p>
                        Reach out to us directly by phone for immediate
                        assistance.
                      </p>

                      <button
                        className="btn btn-golden shadow"
                        onClick={handlePhoneClick}
                      >
                        Call Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 p-3 justify-content-center">
                <div className="card contactUs-card shadow">
                  <div className="card-body p-4 bg-golden">
                    <div className="text-center">
                      <FaAt className="fs-2 rounded-circle text-white" />
                      <h4 className="text-white card-title mt-5">
                        Send an Email
                      </h4>
                      <p>
                        Drop us an email for inquiries, feedback, or support.
                      </p>

                      <button
                        className="btn btn-light shadow"
                        onClick={handleEmailClick}
                      >
                        Email Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 p-3 justify-content-center">
                <div className="card contactUs-card shadow">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <FaFacebook className="fs-2 rounded-circle text-golden" />
                      <h4 className="text-golden card-title mt-5">
                        Connect on Facebook
                      </h4>
                      <p>
                        Stay connected with us on Facebook for updates and news.
                      </p>

                      <button
                        className="btn btn-golden shadow"
                        onClick={handleFacebookClick}
                      >
                        Follow on Facebook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center mt-5">
                <div className="col-md-6 text-center">
                  <p>
                    Contact us for any inquiries, feedback, or support. We're
                    here to help!
                  </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mt-4">
              <div className="col-md-12 ">
                {showThanks ? (
                  <div
                    className="row bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center"
                    style={{ minHeight: "70vh" }}
                  >
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <div
                        className="alert alert-success mt-3 text-center"
                        role="alert"
                      >
                        Thanks! Your message has been sent successfully.
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center justify-content-center">
                      <img
                        src={require("../imgs/illustrations/contact_us.png")}
                        alt="..."
                        className="img-fluid"
                        style={{ mixBlendMode: "multiply" }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="card bg-light rounded-3 border-0 mb-3 mt-3">
                    <div className="card-body">
                      <section className="mb-4">
                        <div className="row">
                          {loading ? (
                            <div
                              className="col-md-6 d-flex justify-content-center align-items-center"
                              style={{ minHeight: "60vh" }}
                            >
                              <div className="text-center justify-content-center">
                                <GridLoader
                                  type="Oval"
                                  color="#FFD700"
                                  height={50}
                                  width={50}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="col-md-6 mb-md-0 mb-5">
                              <h2 className="h1-responsive font-weight-bold text-center my-4 mb-5">
                                Contact us
                              </h2>
                              {errorMessage && (
                                <div
                                  className="alert alert-danger mt-3 text-center"
                                  role="alert"
                                >
                                  {errorMessage}
                                </div>
                              )}
                              <form
                                id="contact-form"
                                name="contact-form"
                                onSubmit={handleSubmit}
                              >
                                <div className="row ">
                                  <div className="col-md-6">
                                    <div className="form-outline mb-4">
                                      <label htmlFor="name" className="">
                                        Your name
                                      </label>
                                      <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-outline mb-4">
                                      <label htmlFor="email" className="">
                                        Your email
                                      </label>
                                      <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-outline mb-4">
                                      <label htmlFor="subject" className="">
                                        Subject
                                      </label>
                                      <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="form-control"
                                        placeholder="Your subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="md-form">
                                      <label htmlFor="message">
                                        Your message
                                      </label>
                                      <textarea
                                        type="text"
                                        id="message"
                                        name="message"
                                        rows="2"
                                        className="form-control md-textarea"
                                        placeholder="Enter your message..."
                                        value={formData.message}
                                        onChange={handleChange}
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center text-md-left mt-4">
                                  <button
                                    type="submit"
                                    className="btn btn-golden"
                                  >
                                    Send
                                  </button>
                                </div>
                                <div className="status"></div>
                              </form>
                            </div>
                          )}
                          <div className="col-md-6 text-center d-flex justify-content-center align-items-center">
                            <img
                              src={require("../imgs/illustrations/contact_us.png")}
                              alt="..."
                              className="img-fluid"
                              style={{ mixBlendMode: "multiply" }}
                            />
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                )}
                <p className=" mt-4">
                  Feel free to reach out to us with any questions, concerns, or
                  feedback. We strive to respond to all inquiries promptly and
                  provide the best possible support.
                </p>
                <p>
                  Our team looks forward to assisting you and ensuring you have
                  a great experience with Play Ways. Whether it's about our
                  games, events, or any other inquiries, we're here to help.
                </p>
                <p className="mb-5">Thank you for choosing Play Ways!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
