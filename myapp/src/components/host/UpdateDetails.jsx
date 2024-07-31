import React, { useEffect, useState } from "react";
import hostApis from "../apis/HostApis";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../imgs/Logo.png";

const UpdateDetails = () => {
  const { stationId } = useParams();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [logoAvailable, setLogoAvailable] = useState(true);
  const [newLogo, setNewLogo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    gsLogo: null,
  });

  useEffect(() => {
    document.title = "PlayWays Host - Update Details";
  }, [])

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewLogo(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithLogo = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "gsLogo" && newLogo) {
        formDataWithLogo.append("gsLogo", newLogo);
      } else if (key !== "gsLogo") {
        formDataWithLogo.append(key, formData[key]);
      }
    });
    try {
      await hostApis.updateGameStation(stationId, formDataWithLogo);
      navigate(`/host/gameStation/${stationId}`);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchGameStationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGameStationData = async () => {
    try {
      const response = await hostApis.getGameStationData(stationId);
      const { name, email, phone, country, state, city, address, gsLogo } =
        response.data.gameStation;
      setFormData({
        name,
        email,
        phone,
        country,
        state,
        city,
        address,
        gsLogo : gsLogo ? `${process.env.REACT_APP_baseUrl}${gsLogo}` : null,
      });
      setLogoAvailable(!!gsLogo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="card m-md-3 mt-lg-5 mb-lg-5 shadow-lg">
          <div className="card-body">
            <h2 className="text-center display-5 mb-5">Update Game Station</h2>
            <form onSubmit={handleSubmit}>
              <div className="container ">
                <div className="row">
                  <div className="col-md-5 d-flex justify-content-center align-items-center">
                    <div className="mb-3">
                      <p
                        className="text-center h2"
                        style={{ fontFamily: "joseph" }}
                      >
                        Logo
                      </p>
                        <label
                          htmlFor="logoInput"
                          className="d-block cursor-pointer"
                        >
                          <div className="mt-4">
                          {logoAvailable ? ( 
                            <img
                              src={
                                formData.gsLogo instanceof File
                                  ? URL.createObjectURL(formData.gsLogo)
                                  : formData.gsLogo
                              }
                              alt="Logo Preview"
                              className="img-fluid mb-3 rounded-circle border"
                              width={window.innerWidth < 768 ? "150" : "300"}
                              style={{
                                minWidth: "150px",
                                aspectRatio: "1/1",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <img
                              src={Logo} // Placeholder image
                              alt="Placeholder"
                              className="img-fluid mb-3 rounded-circle border"
                              width={window.innerWidth < 768 ? "150" : "300"}
                              style={{
                                minWidth: "150px",
                                aspectRatio: "1/1",
                                objectFit: "cover",
                              }}
                            />
                          )}
                          </div>
                        </label>

                      <input
                        type="file"
                        className="form-control w-100 visually-hidden"
                        accept="image/*"
                        onChange={handleLogoChange}
                        id="logoInput"
                        multiple={false}
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
                        value={formData.name}
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
                        readOnly
                        defaultValue={formData.email}
                        placeholder="Enter Email Address"
                        // onChange={handleInputChange}
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Phone:</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter Phone Number"
                      />
                    </div>

                    <div className="mb-2">
                      <label className="form-label">Country:</label>
                      <select
                        name="country"
                        className="form-select"
                        onChange={handleInputChange}
                        value={formData.country}
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
                        onChange={handleInputChange}
                        value={formData.state}
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
                        value={formData.city}
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
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-5 mb-3">
                <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/host/gameStation/${stationId}`)}>
                  Back
                </button>
                <button type="submit" className="btn btn-golden">
                  Update Game Station
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDetails;
