import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../Assets/CSS/Calender.css";
import "../Assets/JavaScript/calender";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Demo = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthNames = useMemo(() => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }, []);

  const timeSlots = useMemo(
    () => [
      "9am - 10am",
      "10am - 11am",
      "11am - 12pm",
      "12pm - 1pm",
      "1pm - 2pm",
      "2pm - 3pm",
      "3pm - 4pm",
      "4pm - 5pm",
      "5pm - 6pm",
      "6pm - 7pm",
    ],
    []
  );

  const renderCalendar = useCallback(() => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );
    const startDayIndex = firstDayOfMonth.getDay();
    const daysContainer = document.querySelector(".days");
    daysContainer.innerHTML = "";

    document.getElementById("currentMonth").innerText = `${
      monthNames[currentDate.getMonth()]
    } ${currentDate.getFullYear()}`;

    for (let i = 0; i < startDayIndex; i++) {
      const emptyDay = document.createElement("div");
      emptyDay.classList.add("empty-day");
      daysContainer.appendChild(emptyDay);
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const calendarDay = document.createElement("div");
      calendarDay.textContent = day;
      calendarDay.classList.add("calendar-day");
      daysContainer.appendChild(calendarDay);
    }
  }, [currentDate, monthNames]);

  useEffect(() => {
    renderCalendar();
  }, [currentDate, renderCalendar]);

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <>
      <div className="container p-0">
        <div className="row bg-light p-3 min-vh-100">
          <div className="col-md-5 bg-opacity-75">
            <div className="calendar ">
              <div className="calendar-header bg-golden">
                <button
                  className="btn "
                  id="prevBtn"
                  aria-label="Previous month"
                  onClick={goToPreviousMonth}
                >
                  <FaAngleLeft className="text-white fs-4" />
                </button>
                <span className="h2 text-white" id="currentMonth"></span>
                <button
                  className="btn"
                  id="nextBtn"
                  aria-label="Next month"
                  onClick={goToNextMonth}
                >
                  <FaAngleRight className="text-white fs-4" />
                </button>
              </div>
              <div className="calendar-body d-flex justify-content-center">
                <div className="days"></div>
              </div>
            </div>
          </div>
          <div className="col-md-7 bg-light bg-opacity-75 justify-content-center">
            <div className="time-slots m-3">
              {timeSlots.map((slot, index) => (
                <button key={index} className="btn btn-golden m-1 ">
                  <span className="time-slot">{slot}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
