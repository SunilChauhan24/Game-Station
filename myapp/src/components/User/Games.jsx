import React, { useState, useEffect } from "react";
import userApis from "../apis/UserApis";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaSearch, FaUser } from "react-icons/fa";

const Games = () => {
  const { stationId } = useParams();
  const [games, setGames] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await userApis.getAllGamesOfGs(stationId);
        setGames(response.data.games);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [stationId]);

  useEffect(() => {
    document.title = "Play Ways - Games";
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className=" ">
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <div className="container-fluid">
            <button
              className="btn btn-link text-dark me-3"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft />
            </button>
            {/* <span className=" mb-0 h4">Games</span> */}
            <Link
              to={`/gameStation/${stationId}`}
              className="btn btn-link text-dark text-decoration-none"
            >
              <FaUser />{" "}Station Profile
            </Link>
          </div>
        </nav>
      </div>
      <div
        className="row container-fluid justify-content-center bg-opacity-25"
        id="bg-serach"
        style={{ minHeight: "200px" }}
      >
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <div className="input-group shadow-lg  rounded-5">
            <input
              type="text"
              name="search"
              placeholder="Search Game Stations..."
              value={searchQuery}
              onChange={handleSearch}
              className="form-control form-control-lg"
            />
            <button className="btn btn-lg btn-golden">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      <div className="container p-4">
        <h2 className="text-center my-4">Games</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredGames.map((game) => (
            <div className="col" key={game.id}>
              <div className="card h-100 shadow">
                <img
                  src={`${process.env.REACT_APP_baseUrl}${game.image}`}
                  className="card-img-top"
                  alt={game.name}
                  style={{
                    aspectRatio:"4/3",
                    objectFit: "cover"
                  }}
                />
                <div className="card-body">
                  <h4 className="card-title">{game.name}</h4>
                  <p className="card-text">Time : {game.timing} *in minutes</p>
                  <p className="card-text">
                    Price : <b>{game.slotPrice}</b>
                  </p>
                  <Link
                    to={`/gameStation/${stationId}/${game.id}/booking`}
                    className="btn btn-golden"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Games;
