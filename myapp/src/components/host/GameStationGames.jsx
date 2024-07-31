import React, { useCallback, useEffect, useState } from "react";
import hostApis from "../apis/HostApis";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { GridLoader } from "react-spinners";
import { Button, Form, Modal } from "react-bootstrap";

const GameStationGames = () => {
  const navigate = useNavigate();
  const { stationId } = useParams();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [description, setDescription] = useState("");
  const [slotPrice, setSlotPrice] = useState("");
  const [timing, setTiming] = useState("");

  useEffect(() => {
    document.title = "PlayWays Host - Games";
  });

  const fetchGamesOfGameStation = useCallback(async () => {
    try {
      setLoading(true);
      const response = await hostApis.getAllGamesOfGs(stationId);
      setGames(response.data.games);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching games:", error);
      setLoading(false);
    }
  }, [stationId]);

  useEffect(() => {
    fetchGamesOfGameStation();
  }, [stationId, fetchGamesOfGameStation]);

  const handleUpdateGame = async () => {
    try {
      await hostApis.updateGameInGs(
        stationId,
        selectedGame.id,
        description,
        slotPrice,
        timing
      );
      setShowModal(false);
      fetchGamesOfGameStation();
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const handleDeleteGame = async (gameId) => {
    try {
      await hostApis.deleteGameInGs(stationId, gameId);
      fetchGamesOfGameStation();
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleShowModal = (game) => {
    setSelectedGame(game);
    setDescription(game.description);
    setSlotPrice(game.slotPrice);
    setTiming(game.timing);
    setShowModal(true);
  };

  return (
    <>
      <div className="container">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to="/host/gameStations" className="text-warning">
                GameStation
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Games
            </li>
          </ol>
        </nav>

        <h1 className="text-center my-4">Games</h1>
        <button
          className="btn btn-golden mb-3"
          onClick={() => navigate(`/host/gamestation/${stationId}/addGames`)}
        >
          Add Game
        </button>
        {loading ? (
          <div
            className="row d-flex justify-content-center align-items-center"
            style={{ minHeight: "60vh" }}
          >
            <div className="col-md-1 text-center justify-content-center">
              <GridLoader type="Oval" color="#FFD700" height={50} width={50} />
            </div>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-4">
            {games.map((game) => (
              <div className="col mb-4" key={game.id}>
                <div className="card shadow" style={{ maxWidth: "300px" }}>
                  <img
                    src={`${process.env.REACT_APP_baseUrl}${game.image}`}
                    alt=""
                    className="img-fluid"
                    style={{
                      aspectRatio: "1/0.8",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h4 className="card-title">{game.name}</h4>
                    <p className="card-text">Timing: {game.timing} Minutes</p>
                    <p className="card-text">Description: {game.description}</p>
                    <p className="card-text">
                      Slot Price: <b>{game.slotPrice}</b>
                    </p>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleShowModal(game)}
                      >
                        <FaPencilAlt /> Update
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteGame(game.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSlotPrice">
              <Form.Label>Slot Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter slot price"
                value={slotPrice}
                onChange={(e) => setSlotPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter time"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="golden" onClick={handleUpdateGame}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameStationGames;
