import React, { useState } from "react";
import hostApis from "../apis/HostApis";
import { Link, useNavigate } from "react-router-dom";
import "../Assets/CSS/HostLogin.css";

const HostResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const otp = localStorage.getItem("hostOtp");
  const email = localStorage.getItem("hostEmail");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords don't match.");
        setSuccessMessage("");
        return;
      }

      const response = await hostApis.resetPassword(email, otp, newPassword);

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        navigate("/host/login");

        localStorage.removeItem("hostEmail");
        localStorage.removeItem("hostOtp");
      } else {
        setErrorMessage(response.data.error);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrorMessage("Internal server error. Please try again later.");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <div className="bg-host">
        <div className="container min-vh-100">
          <div className="row d-flex justify-content-center p-3">
            <div className="col-md-5 pt-3">
              <div className="card shadow">
                <div className="card-body p-4">
                  <form onSubmit={handleResetPassword}>
                    <div className="text-center">
                      <img
                        src={require("../imgs/Logo.png")}
                        alt="Logo"
                        id="logo"
                        className="img-fluid"
                        width={"50%"}
                      />
                    </div>
                    <h1 className="text-center mb-3 ">Reset Password</h1>
                    {errorMessage && (
                      <div className="alert alert-danger alert-dismissible fade show">
                        {errorMessage}
                      </div>
                    )}
                    {successMessage && (
                      <div className="alert alert-success alert-dismissible fade show">
                        {successMessage}
                      </div>
                    )}

                    <div className="form-outline mb-3">
                      <label htmlFor="password" className="input-label mb-2">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control mb-3"
                        id="newPassword"
                        name="password"
                        placeholder="Enter Password"
                        autoComplete="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <label htmlFor="cpassword" className="input-label mb-2">
                        Confirm Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control mb-3"
                        id="newCPassword"
                        name="newCPassword"
                        placeholder="Confirm Password"
                        autoComplete="newCPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="text-end form-outline mb-3">
                      <input
                        id="showPassword"
                        type="checkbox"
                        className="form-check-input"
                        onClick={togglePasswordVisibility}
                      />
                      <label
                        htmlFor="showPassword"
                        className="input-label mb-2 ms-1"
                      >
                        Show Password
                      </label>
                    </div>

                    <button
                      className="btn mt-2 btn-lg w-100"
                      id="logIn"
                      type="submit"
                    >
                      Reset Password
                    </button>

                    <p className="hrline">OR</p>

                    <div className="text-center">
                      <Link
                        className="btn btn-sm w-50 text-center text-secondary"
                        to={"/host/login"}
                      >
                        Back to Login
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostResetPassword;
