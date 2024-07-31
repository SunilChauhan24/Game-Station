import React, { useEffect, useState } from "react";
import hostApis from "../apis/HostApis";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ToastMessages from "../ToastMessages";

const GameCatalogPage = () => {
  const { stationId } = useParams();
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");
  const [slotPrice, setSlotPrice] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await hostApis.getAllGames();
        setGames(response.data.games);
      } catch (error) {
        console.log("Internal server error : ", error);
      }
    };

    fetchGames();
  }, []);

  const openModal = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const handleAddGame = async () => {
    try {
      await hostApis.addGameInGs(
        stationId,
        selectedGame._id,
        description,
        slotPrice,
        time
      );
      setGames([...games, selectedGame]);
      setShowModal(false);
      navigate(`/host/gameStation/${stationId}/games`);
      setToast({
        show: true,
        type: "success",
        message: "Game added successfully",
      });
    } catch (error) {
      console.error("Error adding game to game station:", error);
      if (error.response && error.response.status === 400) {
        setShowModal(false);
        setToast({ show: true, type: "error", message: "Game already exists" });
      } else {
        setToast({
          show: true,
          type: "error",
          message: "Error! Please try again later.",
        });
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center mb-4 text-muted">Game Catalog</h1>
        <div className="text-start mb-3">
          <Link
            to={`/host/gameStation/${stationId}/games`}
            className="btn btn-secondary mb-3"
          >
            Back
          </Link>
        </div>
        <div className="row row-cols-1 row-cols-md-4 justify-content-center g-4">
          {games.map((game) => (
            <div key={game._id} className="col" onClick={() => openModal(game)}>
              <div className="card h-100">
                <img
                  src={`${process.env.REACT_APP_baseUrl}${game.image}`}
                  className="card-img-top"
                  alt={game.name}
                  style={{
                    aspectRatio: "1/0.8",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body h-100">
                  <h4 className="card-title">{game.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Game to Game Station</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="slotPrice" className="form-label">
                Slot Price
              </label>
              <input
                type="text"
                className="form-control"
                id="slotPrice"
                value={slotPrice}
                onChange={(e) => setSlotPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <span className="text-muted"> *in minutes</span>
              <input
                type="text"
                className="form-control"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-golden"
                onClick={handleAddGame}
              >
                Add Game
              </button>
            </div>
          </Modal.Body>
        </Modal>
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

export default GameCatalogPage;
