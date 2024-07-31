import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import hostApis from "../apis/HostApis";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";

const Slots = () => {
  const { stationId } = useParams();
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slotsByGame, setSlotsByGame] = useState({});
  const [slotToBeUpdated, setSlotToBeUpdated] = useState(null);
  const [updatedTimeFrom, setUpdatedTimeFrom] = useState("");
  const [updatedTimeTo, setUpdatedTimeTo] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleGameChange = (event) => {
    setSelectedGame(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleUpdateClick = (slot) => {
    setSlotToBeUpdated(slot);
    setShowModal(true);
  };

  const handleTimeFromChange = (event) => {
    setUpdatedTimeFrom(event.target.value);
  };

  const handleTimeToChange = (event) => {
    setUpdatedTimeTo(event.target.value);
  };

  const handleUpdateSlot = async () => {
    try {
      const updatedSlotData = {
        timefrom: updatedTimeFrom,
        timeto: updatedTimeTo,
      };

      console.log(updatedSlotData);

      const response = await hostApis.updateSlotTime(
        slotToBeUpdated._id,
        updatedSlotData
      );

      fetchSlotsByGsId();

      console.log("Slot updated successfully:", response.data);

      setSlotToBeUpdated(null);
      setUpdatedTimeFrom("");
      setUpdatedTimeTo("");
      setShowModal(false);
    } catch (error) {
      console.error("Error updating slot:", error);
    }
  };

  useEffect(() => {
    if (slotToBeUpdated) {
      const timeFrom = moment(slotToBeUpdated.timefrom, "hh:mm A");
      setUpdatedTimeFrom(timeFrom.format("hh:mm A"));

      const timeTo = moment(slotToBeUpdated.timeto, "hh:mm A");
      setUpdatedTimeTo(timeTo.format("hh:mm A"));
    }
  }, [slotToBeUpdated]);

  const fetchSlotsByGsId = useCallback(async () => {
    try {
      const response = await hostApis.getAllSlotsbyGsId(stationId);
      const slotsData = response.data.slots;

      const uniqueGames = [
        ...new Set(slotsData.map((slot) => slot.gameid.name)),
      ];
      setGames(uniqueGames);
      setSelectedGame(uniqueGames[0]);

      const slotsByGameObj = {};
      uniqueGames.forEach((game) => {
        const gameSlots = slotsData.filter((slot) => slot.gameid.name === game);
        slotsByGameObj[game] = gameSlots;
      });
      setSlotsByGame(slotsByGameObj);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  }, [stationId]);

  useEffect(() => {
    fetchSlotsByGsId();
  }, [stationId, fetchSlotsByGsId]);

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  const filteredSlots = slotsByGame[selectedGame]?.filter((slot) => {
    const slotDate = moment(slot.date).format("YYYY-MM-DD");
    const currentDate = moment(selectedDate).format("YYYY-MM-DD");
    return slotDate === currentDate;
  });

  const handleDeleteClick = async (slotId) => {
    try {
      const response = await hostApis.deleteSlot(slotId);
      console.log("Slot deleted successfully:", response.data);

      setSlotsByGame((prevState) => {
        const updatedSlotsByGame = { ...prevState };
        Object.keys(updatedSlotsByGame).forEach((game) => {
          updatedSlotsByGame[game] = updatedSlotsByGame[game].filter(
            (slot) => slot._id !== slotId
          );
        });
        return updatedSlotsByGame;
      });

      fetchSlotsByGsId();
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <div className="container mt-4 vh-100">
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Slot Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="timeFrom">Time From:</label>
            <input
              type="time"
              className="form-control"
              id="timeFrom"
              value={updatedTimeFrom}
              onChange={handleTimeFromChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeTo">Time To:</label>
            <input
              type="time"
              className="form-control"
              id="timeTo"
              value={updatedTimeTo}
              onChange={handleTimeToChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="golden" onClick={handleUpdateSlot}>
            Update Slot
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row mb-3">
        <div className="col-md-6">
          <Link
            to={`/host/gameStation/${stationId}/addSlots`}
            className="btn btn-golden"
          >
            <FaPlus /> Add Slots
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="gameSelect">Select a game:</label>
            <select
              className="form-control"
              id="gameSelect"
              value={selectedGame}
              onChange={handleGameChange}
            >
              {games.map((game, index) => (
                <option key={index} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label htmlFor="datePicker">Select a date:</label>
            <br />
            <ReactDatePicker
              className="form-control"
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={today}
              maxDate={nextWeek}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
      </div>
      <h2 className="mt-5">{selectedGame} Slots</h2>
      {filteredSlots && filteredSlots.length === 0 ? (
        <p>No slots available for {selectedGame}</p>
      ) : (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Time</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSlots &&
              filteredSlots.length > 0 &&
              filteredSlots.map((filteredSlot, index) => (
                <React.Fragment key={index}>
                  {filteredSlot.slots.map((slot, slotIndex) => (
                    <tr key={slotIndex}>
                      <td>{slotIndex + 1}</td>
                      <td>
                        {slot.timefrom} - {slot.timeto}
                      </td>
                      <td>{slot.status}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-transparent"
                          onClick={() => handleUpdateClick(slot)}
                        >
                          <FaPencilAlt className="text-primary" />
                        </button>
                        <button
                          className="btn btn-transparent"
                          onClick={() => handleDeleteClick(slot._id)}
                        >
                          <FaTrash className="text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Slots;
