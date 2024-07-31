import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Assets/CSS/AdminLogin.css";
import { AdminContext } from "../context/AdminContext";
// import adminApis from "../apis/AdminApis";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, error } = useContext(AdminContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const adminId = sessionStorage.getItem("adminId");
    if (adminId) {
      navigate(`/admin/${adminId}/dashboard`);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    document.title = "PlayWays Admin - Login";
  }, []);

  return (
    <>
      <div className="bg bg-opacity-25">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-4">
            <div className="border rounded-3 p-4 bg-light shadow-lg">
              <form method="POST" onSubmit={handleSubmit}>
                <h1
                  className="text-center mb-3"
                  style={{ fontFamily: "josheph" }}
                >
                  ADMIN LOG-IN
                </h1>

                {error && <div className="alert alert-danger">{error}</div>}

                <label htmlFor="email" className="input-label mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control mb-3"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

                <button className="btn mt-1 w-100" id="logIn" type="submit">
                  Log In
                </button>

                <p className="hrline text-center my-3">OR</p>

                <div className="text-center mb-3">
                  <Link className="btn forgot text-primary" to={"/T&c/"}>
                    <u> Terms & Conditions</u>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
