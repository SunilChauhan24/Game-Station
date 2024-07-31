import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import hostApis from "../apis/HostApis";
import "../Assets/CSS/HostLogin.css";
import { HostContext } from "../context/HostContext";

const HostLogin = () => {
  const { login, error } = useContext(HostContext);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const hostId = localStorage.getItem("hostId");

    if (hostId) {
      navigate("/host/gameStations");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
     await login(emailOrPhone, password);
  };

  // const handleGoogleLogin = async () => {
  //   window.open("http://localhost:1000/hosts/auth/google/callback", "_self");
  // };

  return (
    <>
      <div className="bg-host">
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="col-md-5">
                <div className="card shadow rounded-3 p-4">
                  <div className="card-body">
                    <form method="POST" onSubmit={handleSubmit}>
                      <h1
                        className="text-center mb-3"
                        style={{ fontFamily: "josheph" }}
                      >
                        Host LOG-IN
                      </h1>

                      {/* error & success msg */}
                      {error && (
                        <div className="alert alert-danger ">{error}</div>
                      )}
                      {/* {successMessage && (
                        <p classNameName="alert alert-success">
                          {successMessage}
                        </p>
                      )} */}

                      <label htmlFor="email" className="input-label mb-2">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        id="email"
                        name="email"
                        placeholder="Email Id, Phone number"
                        autoComplete="email"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        required
                      />

                      <label htmlFor="password" className="input-label mb-2">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control mb-3"
                        id="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="text-end">
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
                        className="btn mt-1 w-100"
                        id="logIn"
                        type="submit"
                      >
                        Log In
                      </button>

                      <p className="hrline text-center my-3">OR</p>

                      <div className="text-center mb-">
                        <Link
                          className="btn forgot text-primary fs-6"
                          to={"/host/forgotpassword"}
                        >
                          <u> Forgot Password ?</u>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card shadow rounded-3 p-3 mt-3 mb-3">
                  <Link className="btn w-100" to={"/host/signup"}>
                    Create a new Account?{" "}
                    <span className="text-primary">Register</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostLogin;
