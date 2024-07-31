import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import userApis from "../apis/UserApis";
import { Spinner } from "react-bootstrap";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      navigate("/");
    }
  }, [navigate]);

  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phone);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
    return passwordPattern.test(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const { userName, email, phone, password, cpassword } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "email" && !validateEmail(value)) {
      e.target.style.borderColor = "red";
    } else if (name === "phone" && !validatePhone(value)) {
      e.target.style.borderColor = "red";
    } else if (
      (name === "password" || name === "cpassword") &&
      !validatePassword(value)
    ) {
      e.target.style.borderColor = "red";
    } else if (name === "userName" && !value.trim()) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);

    if (!userName || !email || !phone || !password || !cpassword) {
      console.error("Please fill in all fields properly.");
      setError("Please fill in all fields properly.");
      setButtonDisabled(false);
      return;
    }

    if (password !== cpassword) {
      console.error("Password doesn't match.");
      setError("Password doesn't match.");
      setButtonDisabled(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email.");
      setButtonDisabled(false);
      return;
    }

    if (!validatePhone(phone)) {
      setError("Invalid phone number.");
      setButtonDisabled(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      setButtonDisabled(false);
      return;
    }

    try {
      setLoading(true);
      const response = await userApis.register(
        userName,
        email,
        phone,
        password
      );

      if (response.status === 200) {
        console.log("User registered successfully.");
        navigate("/login");
      } else {
        console.error("Registration failed:", response.data.error);
        setError("Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      setError("Registration failed.");
    } finally {
      setLoading(false);
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <section className="">
        <div
          className="px-4 py-5 px-md-5 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="container">
            <div className="row gx-lg-5 align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0 text-center">
                <img
                  src={require("../imgs/Logo1.png")}
                  alt="Logo"
                  id="logo"
                  className="mx-auto img-fluid"
                  width={"50%"}
                />
              </div>

              <div className="col-lg-6 mb-5 mb-lg-0 text-start">
                <div className="card ">
                  <div className="card-body py-5 px-md-5">
                    <h2
                      className="display-6 text-center text-warning mb-3 fw-bold"
                      style={{ fontFamily: "joseph" }}
                    >
                      Sign up
                    </h2>

                    {loading && (
                      <div className="text-center">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    )}

                    {error && (
                      <div className="alert alert-danger ">{error}</div>
                    )}

                    <form className="" method="post" onSubmit={handleSignUp}>
                      <div className="form-outline mb-4">
                        <label htmlFor="userName" className="form-label">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="userName"
                          name="userName"
                          placeholder="Name"
                          autoComplete="userName"
                          value={userName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label htmlFor="email" className="form-label">
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
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Phone Number"
                          autoComplete="tel"
                          maxLength={12}
                          value={phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                          autoComplete="password"
                          value={password}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label htmlFor="cpassword" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          id="cpassword"
                          name="cpassword"
                          placeholder="Confirm Password"
                          value={cpassword}
                          onChange={handleChange}
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

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-block btn-lg w-100"
                          id="logIn"
                          disabled={loading || buttonDisabled}
                        >
                          {loading ? "Signing up..." : "Sign up"}
                        </button>
                      </div>

                      <p className="hrline">or</p>

                      {/* Link to login */}
                      <div className=" text-center">
                        <Link className="w-100" to={"/login"}>
                          Already have a Account ?
                        </Link>{" "}
                        <br />
                        <Link
                          className="w-100 text-decoration-none text-muted"
                          to={"/T&C"}
                        >
                          Terms & Conditions
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
