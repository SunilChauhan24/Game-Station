import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import adminApis from "../apis/AdminApis";

const PasswordChange = () => {
  const { adminId } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await adminApis.changePassword(adminId, newPassword);
      setSuccessMessage("Password changed successfully");
      navigate(`/admin/${adminId}/dashboard`)
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Failed to change password");
      console.error("Error changing password:", error);
    }
  };
  return (
    <>
      <div className="bg">
        <div className="container min-vh-100">
          <div className="row d-flex justify-content-center align-items-center p-3 min-vh-100">
            <div className="col-md-5 pt-3">
              <div className="card shadow">
                <div className="card-body p-4">
                  <form onSubmit={handleChangePassword}>
                    <h1 className="text-center mb-3 ">Change Password</h1>
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
                        to={`/admin/${adminId}/dashboard`}
                      >
                        Back to Dashboard
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

export default PasswordChange;
