import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hostApis from "../apis/HostApis";
import "../Assets/CSS/HostLogin.css";

const HostSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const hostId = localStorage.getItem("hostId");

    if (hostId) {
      navigate("/host/gameStations");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      const response = await hostApis.register(
        formData.email,
        formData.phone,
        formData.password
      );

      console.log("Registration successful:", response.data);
      navigate("/host/login");

      setFormData({
        email: "",
        password: "",
        phone: "",
        cpassword: "",
      });
      setPasswordError("");
    } catch (error) {
      console.error("Registration error:", error);
      setPasswordError("Registration failed. Please try again.");
    }
  };


  return (
    <div className="bg-host">
      <div className="container ">
        <div className="row ">
          <div className="d-flex justify-content-center align-items-center vh-100 ">
            <div className="col-md-5">
              <div className="card rounded-3 p-4 shadow">
                <div className="card-body">
                  <form method="POST" onSubmit={handleSubmit}>
                    <h1
                      className="text-center mb-3"
                      style={{ fontFamily: "josheph" }}
                    >
                      Host SIGN-UP
                    </h1>

                    {passwordError && (
                      <p className="alert alert-danger error">
                        {passwordError}
                      </p>
                    )}

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
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="phone" className="input-label mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control mb-3"
                      id="phone"
                      name="phone"
                      placeholder="Phone Number"
                      autoComplete="phone"
                      value={formData.phone}
                      maxLength={12}
                      onChange={handleChange}
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
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />

                    <label htmlFor="cpassword" className="input-label mb-2">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control mb-3"
                      id="cpassword"
                      name="cpassword"
                      placeholder="Confirm Password"
                      autoComplete="cpassword"
                      value={formData.cpassword}
                      onChange={handleChange}
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
                      className="btn mt-1 w-100 "
                      id="logIn"
                      type="submit"
                    >
                      Sign Up
                    </button>

                    <p className="hrline text-center my-3">OR</p>
                    <Link className="btn w-100 text-primary" to={"/host/login"}>
                      <u> Already have a Account?</u>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostSignup;
