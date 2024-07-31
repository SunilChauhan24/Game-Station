import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hostApis from "../apis/HostApis";
import "../Assets/CSS/HostLogin.css";


const HostForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (success === "Password reset otp sent successfully.") {
      setTimeout(() => {
        navigate("/host/otpVerification");
      }, 1500);
    }
  }, [success, navigate]);

  const handleSendClick = async (e) => {
    e.preventDefault();

    try {
      const response = await hostApis.forgotPassword(email);

      if (response.status === 200) {
        console.log("Password reset otp sent successfully.");
        localStorage.setItem("hostEmail", email);

        setSuccess("Password reset otp sent successfully.");
        setError("");
      } else {
        console.error(
          "Failed to send password reset link:",
          response.data.error
        );
        setError("Failed to send password reset link. Please try again.");
        setSuccess("");
      }
    } catch (error) {
      console.error("Password reset request failed:", error.message);
      setError("Password reset request failed. Please try again.");
      setSuccess("");
    }
  };
  return (
    <div className="bg-host">
      <div className="container p-4">
        <div className="row justify-content-center">
          <div className="col-md-5 m-3">
            <div className="card shadow-lg">
              <div className="card-body m-g-3 m-5">
                <form onSubmit={handleSendClick}>
                  <div className="text-center">
                    <img
                      src={require("../imgs/Logo.png")}
                      alt="Logo"
                      id="logo"
                      className="img-fluid"
                      style={{ maxWidth: "60%" }}
                    />
                  </div>

                  <h1 className="mb-3 text-center">Forgot Password</h1>

                  {error && (
                    <div className="alert alert-danger mt-2">{error}</div>
                  )}
                  {success && (
                    <div className="alert alert-success mt-2">{success}</div>
                  )}

                  <div className="form-outline mb-4">
                    <label htmlFor="email" className="input-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                      autoComplete="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>

                  <div className="text-center mb-3">
                    <button
                      className="btn btn-block  w-100"
                      type="submit"
                      id="signUp"
                    >
                      SEND
                    </button>
                  </div>

                  <p className="text-center hrline">OR</p>

                  <div className="text-center">
                    <Link className="btn text-primary" to={"/login"}>
                      Back to Login
                    </Link>
                  </div>

                  <div className="text-center">
                    <a className="btn text-primary" href="/">
                      Need help?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostForgotPassword;
