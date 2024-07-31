import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userApis from "../apis/UserApis";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const navigate = useNavigate();
  const otp = localStorage.getItem("otp");
  const email = localStorage.getItem("email");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setConfirmPassword(passwordValue);
    setInvalidPassword(!validatePassword(passwordValue));
    if (!validatePassword(passwordValue)) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }
  };

  const handleCPasswordChange = (e) => {
    const passwordValue = e.target.value;
    setNewPassword(passwordValue);
    setInvalidPassword(!validatePassword(passwordValue));
    if (!validatePassword(passwordValue)) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage("Passwords don't match.");
        setSuccessMessage("");
        setInvalidPassword(true);
        return;
      }

      if (!validatePassword(newPassword)) {
        setErrorMessage(
          "Password must contain one uppercase, one lowercase, one special character, and one number."
        );
        setSuccessMessage("");
        setInvalidPassword(true);
        return;
      }

      const response = await userApis.resetPassword(email, otp, newPassword);

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        setErrorMessage("");
        navigate("/login");

        localStorage.removeItem("email");
        localStorage.removeItem("otp");
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
      <div className="container">
        <div className="row justify-content-center m-3">
          <div className="col-md-5">
            <div className="card shadow">
              <div className="card-body m-4">
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
                      className={`form-control mb-3 ${
                        invalidPassword ? "is-invalid" : ""
                      }`}
                      id="newPassword"
                      name="password"
                      placeholder="Enter Password"
                      autoComplete="password"
                      value={newPassword}
                      onChange={handleCPasswordChange}
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
                      onChange={handlePasswordChange}
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
                      to={"/login"}
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
    </>
  );
};

export default ResetPassword;
