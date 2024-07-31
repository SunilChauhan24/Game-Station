import React, { useEffect, useState } from "react";
import logoPlaceholder from "../imgs/Logo.png";
import { useNavigate } from "react-router-dom";
import hostApis from "../apis/HostApis";
import ToastMessages from "../ToastMessages";

const GameStationForm = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [gameStationData, setGameStationData] = useState({
    name: "",
    email: "",
    city: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    gsLogo: null,
    logoPreview: logoPlaceholder,
    hostId: localStorage.getItem("hostId"),
    error: "",
  });
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    document.title = "PlayWays Host - Add new station";
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await hostApis.getCountries();
        setCountries(response.data.countries);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await hostApis.getStates();
        setStates(response.data.states);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await hostApis.getCities();
        setCities(response.data.cities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setGameStationData((prevState) => ({
            ...prevState,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameStationData((prevState) => ({
      ...prevState,
      [name]: value,
      error: "",
    }));
  };

  const handleLogoChange = (e) => {
    const logoFile = e.target.files[0];
    setGameStationData((prevState) => ({
      ...prevState,
      gsLogo: logoFile,
      logoPreview: URL.createObjectURL(logoFile),
      error: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("host", gameStationData.hostId);
    formData.append("name", gameStationData.name);
    formData.append("email", gameStationData.email);
    formData.append("phone", gameStationData.phone);
    formData.append("city", gameStationData.city);
    formData.append("state", selectedState);
    formData.append("country", selectedCountry);
    formData.append("latitude", parseFloat(gameStationData.latitude));
    formData.append("longitude", parseFloat(gameStationData.longitude));
    formData.append("address", gameStationData.address);
    formData.append("gsLogo", gameStationData.gsLogo);

    try {
      const response = await hostApis.addGameStation(formData);

      if (response.data.success) {
        setToast({
          show: true,
          type: "success",
          message: "Station added successfully.",
        });
        navigate("/host/gameStations");
        setGameStationData({
          name: "",
          email: "",
          phone: "",
          city: "",
          address: "",
          latitude: "",
          longitude: "",
          gsLogo: null,
          logoPreview: logoPlaceholder,
          hostId: localStorage.getItem("hostId"),
          error: "",
        });
      } else {
        setToast({
          show: true,
          type: "error",
          message: "Failed to add station. Please try again.",
        });
        setGameStationData((prevState) => ({
          ...prevState,
          error: "Failed to add Game Station",
        }));
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request error:", error.message);
      }

      setGameStationData((prevState) => ({
        ...prevState,
        error: "Error adding Game Station",
      }));
    }
  };

  return (
    <div className="container mt-4">
      <div className="card m-md-3 mt-lg-5 mb-lg-5 shadow-lg">
        <div className="card-body">
          <h2 className="text-center display-5 mb-3">Add Game Station</h2>
          <p className="text-muted text-center mb-4">Please complete the form with the location where you would like it to be displayed on the map.</p>
          {gameStationData.error && (
            <p className="text-danger text-center">{gameStationData.error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-md-5 d-flex justify-content-center align-items-center">
                  <div className="mb-3">
                    <p
                      className="text-center h2"
                      style={{ fontFamily: "joseph" }}
                    >
                      Logo
                    </p>
                    {gameStationData.logoPreview && (
                      <label
                        htmlFor="logoInput"
                        className="d-block cursor-pointer"
                      >
                        <div className="mt-4">
                          <img
                            src={gameStationData.logoPreview || logoPlaceholder}
                            alt="Logo Preview"
                            className="img-fluid mb-3 rounded-circle border"
                            width={window.innerWidth < 768 ? "150" : "300"}
                            style={{ aspectRatio: "1/1", objectFit: "cover" }}
                          />
                        </div>
                      </label>
                    )}
                    <input
                      type="file"
                      className="form-control w-100 visually-hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                      id="logoInput"
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="mb-2">
                    <label className="form-label">Game Station Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={gameStationData.name}
                      onChange={handleInputChange}
                      placeholder="Enter Station Name"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={gameStationData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email Address"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Phone:</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      maxLength={12}
                      value={gameStationData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Country:</label>
                    <select
                      name="country"
                      className="form-select"
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      value={selectedCountry}
                    >
                      <option value="" disabled>
                        Select the Country
                      </option>
                      {countries.map((country) => (
                        <option key={country._id} value={country.countryName}>
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">State:</label>
                    <select
                      name="state"
                      className="form-select"
                      onChange={(e) => setSelectedState(e.target.value)}
                      disabled={!selectedCountry}
                      value={selectedState}
                    >
                      <option value="" disabled>
                        Select the State
                      </option>
                      {states.map((state) => (
                        <option key={state._id} value={state.stateName}>
                          {state.stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">City:</label>
                    <select
                      name="city"
                      className="form-select"
                      onChange={handleInputChange}
                      disabled={!selectedState}
                      value={gameStationData.city}
                    >
                      <option value="" disabled>
                        Select the City
                      </option>
                      {cities.map((city) => (
                        <option key={city._id} value={city.cityName}>
                          {city.cityName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Address:</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="address"
                      value={gameStationData.address}
                      onChange={handleInputChange}
                      placeholder="Enter Address"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-5 mb-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate(`/host/gameStations`)}
              >
                Back
              </button>
              <button type="submit" className="btn btn-golden">
                Add Game Station
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastMessages
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
        type={toast.type}
        message={toast.message}
      />
    </div>
  );
};

export default GameStationForm;
