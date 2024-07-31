import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import adminApis from "../apis/AdminApis";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";
import ToastMessages from "../ToastMessages";
import { GridLoader } from "react-spinners";

const Games = () => {
  const { adminId } = useParams();
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [gameData, setGameData] = useState({
    name: "",
    image: null,
  });
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await adminApis.fetchGames();
        setGames(response.data.games);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching games:", error);
        setLoading(false);
      }
    };

    fetchGames();

    const interval = setInterval(fetchGames, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = "PlayWays Admin - Games";
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setGameData({ ...gameData, image: e.target.files[0] });
    }
  };

  const handleAddGame = async () => {
    try {
      if (!gameData.image) {
        setToast({
          show: true,
          type: "error",
          message: "Please select an image for the game.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", gameData.name);
      formData.append("image", gameData.image);

      const response = await adminApis.addGame(adminId, formData);

      if (response.status === 201) {
        setGames([...games, response.data.game]);
        setShowModal(false);
        setGameData({
          name: "",
          image: null,
        });
        setToast({
          show: true,
          type: "success",
          message: "Game added successfully.",
        });
      }
    } catch (error) {
      setToast({
        show: true,
        type: "error",
        message: "Error adding game. Please try again.",
      });
      console.error("Error adding game:", error);
    }
  };

  const handleUpdateButtonClick = (game) => {
    setIsEditing(true);
    setSelectedGame(game);
    setGameData({
      name: game.name,
      type: game.type,
      timing: game.timing,
      description: game.description,
      slotPrice: game.slotPrice,
      image: null,
    });
    setShowModal(true);
  };

  const handleUpdateGame = async (id, updateData) => {
    try {
      const formData = new FormData();
      formData.append("name", updateData.name);
      formData.append("type", updateData.type);
      formData.append("timing", updateData.timing);
      formData.append("description", updateData.description);
      formData.append("slotPrice", updateData.slotPrice);

      if (updateData.image !== null) {
        formData.append("image", updateData.image);
      }

      const response = await adminApis.updateGames(adminId, id, formData);

      if (response.status === 200) {
        const updatedGames = games.map((game) =>
          game._id === id ? { ...game, ...updateData } : game
        );
        setGames(updatedGames);
        setToast({
          show: true,
          type: "success",
          message: "Game updated successfully",
        });
        closeModal();
      }
    } catch (error) {
      console.error("Error updating game:", error);
      setToast({
        show: true,
        type: "error",
        message: "Error to update game. Please try again.",
      });
    }
  };

  const handleDeleteGame = async (id) => {
    setGameToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteGame = async () => {
    try {
      const response = await adminApis.deleteGame(adminId, gameToDelete);

      if (response.status === 200) {
        const updatedGames = games.filter((game) => game._id !== gameToDelete);
        setGames(updatedGames);
        setShowDeleteConfirmation(false);
        setToast({
          show: true,
          type: "success",
          message: "Game deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Error deleting game:", error);
      setToast({
        show: true,
        type: "error",
        message: "Error to delete game. Please try again.",
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedGame(null);
    setGameData({
      name: "",
      type: "",
      timing: "",
      description: "",
      slotPrice: "",
      image: null,
    });
  };

  return (
    <>
      <div className="container">
        {/* Sitemap Path */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mt-2">
            <li className="breadcrumb-item">
              <Link to={`/admin/${adminId}`} className="text-warning">
                Admin
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Games
            </li>
          </ol>
        </nav>

        <h1 className="mt-4 mb-4">Games</h1>
        <div className="text-start">
          <button
            className="btn btn-golden mb-2"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Add Game
          </button>
        </div>
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
              <div className="col mb-4" key={game._id}>
                <div className="card h-100">
                  <img
                    src={`${process.env.REACT_APP_baseUrl}${game.image}`}
                    className="card-img-top "
                    style={{ aspectRatio: "4/3", objectFit: "cover" }}
                    alt={game.name}
                  />
                  <div className="card-body">
                    <h4 className="card-title">{game.name}</h4>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-around">
                      <button
                        className="btn btn-outline-primary me-1"
                        onClick={() => handleUpdateButtonClick(game)}
                      >
                        <FaPencilAlt /> Update
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleDeleteGame(game._id)}
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
        <ToastMessages
          show={toast.show}
          onClose={() => setToast({ ...toast, show: false })}
          type={toast.type}
          message={toast.message}
        />
      </div>
      <Modal
        title={isEditing ? "Edit Game" : "Add Game"}
        fields={[
          {
            label: "Name",
            type: "text",
            value: gameData.name,
            onChange: (value) => setGameData({ ...gameData, name: value }),
          },
          {
            label: "Image",
            type: "file",
            value: gameData.image,
            onChange: handleFileChange,
          },
        ]}
        handleSubmit={
          isEditing
            ? () => handleUpdateGame(selectedGame._id, gameData)
            : handleAddGame
        }
        handleClose={closeModal}
        buttonText={isEditing ? "Update" : "Add"}
        showModal={showModal}
      />
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDeleteGame} // Confirm deletion
        message="Are you sure you want to delete this game?"
      />
    </>
  );
};

export default Games;
