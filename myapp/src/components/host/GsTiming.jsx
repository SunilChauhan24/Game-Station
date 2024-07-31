import React, { useState } from "react";
import hostApis from "../apis/HostApis";
import { useNavigate, useParams } from "react-router-dom";
import ToastMessages from "../ToastMessages";

const GsTiming = () => {
  const { stationId } = useParams();
  const [closedDays, setClosedDays] = useState([]);
  const [openingTime, setOpeningTime] = useState("00:00");
  const [closingTime, setClosingTime] = useState("00:00");
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setClosedDays([...closedDays, value]);
    } else {
      setClosedDays(closedDays.filter((day) => day !== value));
    }
  };

  const convertTo12HourFormat = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let formattedTime = "";
    let period = "AM";

    if (parseInt(hours, 10) >= 12) {
      period = "PM";
      if (parseInt(hours, 10) > 12) {
        formattedTime = `${parseInt(hours, 10) - 12}`;
      } else {
        formattedTime = `${hours}`;
      }
    } else {
      if (hours === "00") {
        formattedTime = "12";
      } else {
        formattedTime = `${hours}`;
      }
    }

    formattedTime = `${formattedTime}:${minutes} ${period}`;
    return formattedTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedOpeningTime = convertTo12HourFormat(openingTime);
      const formattedClosingTime = convertTo12HourFormat(closingTime);

      const response = await hostApis.setTiming(
        stationId,
        formattedOpeningTime,
        formattedClosingTime,
        closedDays
      );

      setToast({
        show: true,
        type: "success",
        message: `${response.data.message}`,
      });
    } catch (error) {
      console.error("Error setting gamestation timing:", error);
      setToast({
        show: true,
        type: "success",
        message: `Error in update.Please try again`,
      });
    }
  };

  return (
    <div className=" bg-host m-0 bg-opacity-10">
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center p-2"
          style={{ minHeight: "88vh" }}
        >
          <div className="col-md-6 ">
            <div className="card p-5 shadow">
              <div className="card-body"></div>
              <h2 className="text-center">Set Timing of GameStation</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Opening Time:</label>
                  <div className="d-flex align-items-center">
                    <input
                      type="time"
                      className="form-control me-2"
                      value={openingTime}
                      onChange={(e) => setOpeningTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Closing Time:</label>
                  <div className="d-flex align-items-center">
                    <input
                      type="time"
                      className="form-control me-2"
                      value={closingTime}
                      onChange={(e) => setClosingTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Closed Days:</label>
                  <div>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day) => (
                      <div className="form-check" key={day}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          value={day}
                          onChange={handleCheckboxChange}
                          checked={closedDays.includes(day)}
                        />
                        <label className="form-check-label">{day}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="button "
                    className="btn btn-secondary me-2"
                    onClick={() => navigate(`/host/gameStation/${stationId}`)}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-golden">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
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

export default GsTiming;
