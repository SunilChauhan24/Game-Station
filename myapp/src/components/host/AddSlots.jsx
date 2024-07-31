import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import hostApis from "../apis/HostApis";
import { FaPlus, FaTimes } from "react-icons/fa";
import ToastMessages from "../ToastMessages";

const AddSlotsForm = () => {
  const { stationId } = useParams();
  const navigate = useNavigate();
  const [gameid, setGameid] = useState("");
  const [date, setDate] = useState("");
  const [slotsData, setSlotsData] = useState([{ timefrom: "", timeto: "" }]);
  const [games, setGames] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await hostApis.getGameStationData(stationId);
        const gameStationData = response.data.gameStation;
        setGames(gameStationData.games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [stationId]);


  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...slotsData];
    list[index][name] = value;
    setSlotsData(list);
  };

  const handleAddSlot = () => {
    setSlotsData([...slotsData, { timefrom: "", timeto: "" }]);
  };

  const handleRemoveSlot = (index) => {
    const list = [...slotsData];
    list.splice(index, 1);
    setSlotsData(list);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!gameid) {
        console.error("Please select a game.");
        return;
      }
      if (!date) {
        console.error("Please select a date.");
        return;
      }
      if (slotsData.some((slot) => !slot.timefrom || !slot.timeto)) {
        console.error("Please fill in all time slots.");
        return;
      }

      const formattedSlotsData = {
        slots: [
          {
            gameid: gameid,
            date: date,
            slots: slotsData.map((slot) => ({
              timefrom: convertToAMPM(slot.timefrom),
              timeto: convertToAMPM(slot.timeto),
            })),
          },
        ],
      };

      await hostApis.addSlots(stationId, formattedSlotsData);
      console.log("Slots added successfully!");
      setToast({
        show: true,
        type: "success",
        message: "Slots added successfully!",
      });
      navigate(`/host/gameStation/${stationId}/slots`);
    } catch (error) {
      console.error("Error adding slots:", error);
      setToast({
        show: true,
        type: "error",
        message: "Error in adding slots.",
      });
    }
  };

  const convertToAMPM = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = hours % 12 || 12;
    const ampm = hours >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);
  const formattedMaxDate = maxDate.toISOString().split("T")[0];

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2>Add Slots</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="gameSelect">Select a Game:</label>
                    {games && games.length > 0 && (
                      <select
                        className="form-control"
                        id="gameSelect"
                        value={gameid}
                        onChange={(e) => setGameid(e.target.value)}
                      >
                        <option value="">Select a game</option>
                        {games.map((game) => (
                          <option key={game.game._id} value={game.game._id}>
                            {game.game.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date"
                      min={today}
                      max={formattedMaxDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  {slotsData.map((slot, index) => (
                    <div className="card mb-3" key={index}>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor={`timefrom-${index}`}>
                            Time From:
                          </label>
                          <input
                            type="time"
                            className="form-control"
                            name="timefrom"
                            id={`timefrom-${index}`}
                            value={slot.timefrom}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor={`timeto-${index}`}>Time To:</label>
                          <input
                            type="time"
                            className="form-control"
                            name="timeto"
                            id={`timeto-${index}`}
                            value={slot.timeto}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveSlot(index)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={handleAddSlot}
                  >
                    <FaPlus /> Add More
                  </button>
                  <br />
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <Link
                        to={`/host/gameStation/${stationId}/slots`}
                        className="btn btn-secondary mt-2 me-2"
                      >
                        Back
                      </Link>
                      <button type="submit" className="btn btn-golden mt-2">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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
    </>
  );
};

export default AddSlotsForm;
