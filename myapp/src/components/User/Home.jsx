import "animate.css";
import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.title = "Play Ways - Home";
  }, []);

  const handleEmailClick = () => {
    window.location.href = "mailto:playways83@gmail.com";
  };

  const handleFacebookClick = () => {
    window.open(
      "https://www.facebook.com/profile.php?id=61555468633232&mibextid=ZbWKwL",
      "_blank"
    );
  };
  return (
    <>
      <header>
        <Carousel fade>
          <Carousel.Item>
            <div
              className="page-header min-vh-100"
              id="header-img-home"
              loading="lazy"
            >
              <span className="mask bg-gradient-dark opacity-4"></span>
              <div className="container">
                <div className="row justify-content-center vh-100 align-items-center">
                  <div className="col-lg-6 col-sm-9 text-center mx-auto position-absolute">
                    <h1 className="display-4 mb-4">Welcome to Playways</h1>
                    <p className="lead text-white mb-sm-6 mb-4">
                      Explore a world of gaming excitement and community
                      engagement with Playways.
                    </p>
                    <p className="text-white h6 text-uppercase mb-4">
                      connect with us on:{" "}
                      <Link onClick={handleFacebookClick}>FaceBook</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="page-header min-vh-100"
              id="header-img-home"
              loading="lazy"
            >
              <span className="mask bg-gradient-dark opacity-4"></span>
              <div className="container">
                <div className="row justify-content-center vh-100 align-items-center">
                  <div className="col-lg-6 col-sm-9 text-center mx-auto position-absolute">
                    <h1 className="display-4 mb-4">Play with choice</h1>
                    <p className="lead text-white mb-sm-6 mb-4">
                      Just choose your favourite Gamestation, game and book for
                      enjoy your game.
                    </p>
                    <p className="text-white h6 text-uppercase mb-4">
                      connect with us on:{" "}
                      <Link onClick={handleEmailClick}>Email</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
          {/* Add more Carousel.Items for additional slides */}
        </Carousel>
      </header>

      <div
        className="container-fluid  position-relative "
        style={{ top: "-150px", zIndex: "9999" }}
      >
        <div className="card m-lg-3 m-3">
          <div className="card-body shadow">
            {/* row-1 */}
            <div className="row justify-content-center text-center mt-5">
              <div className="col-md-3">
                <h1 className="text-gradient text-warning" id="state1">
                  300+
                </h1>
                <h5 className="mt-3">Players</h5>
                <p>
                  Engage with our vibrant community of players and enthusiasts.
                </p>
              </div>
              <div className="col-md-3">
                <h1 className="text-gradient text-warning" id="state2">
                  30+
                </h1>
                <h5 className="mt-3">Games</h5>
                <p>Discover a wide range of games to enjoy.</p>
              </div>
              <div className="col-md-3">
                <h1 className="text-gradient text-warning" id="state3">
                  30+
                </h1>
                <h5 className="mt-3">Game Stations</h5>
                <p>
                  Find conveniently located game stations for your gaming
                  sessions.
                </p>
              </div>
            </div>

            {/* row-2 */}
            <div className="row align-items-center mt-5 m-lg-5 p-lg-5 mb-5">
              <div className="col-md-6 mb-md-0 mb-4">
                <h3 className="text-warning display-4 fw-bold">
                  Experience the Thrill of Gaming
                </h3>
                <p className="lead mb-md-5 mb-4">
                  Join Playways and unleash your gaming potential.
                </p>
                <p>
                  <span className="me-2">&#9679;</span> Discover new games and
                  challenges.
                </p>
                <p>
                  <span className="me-2">&#9679;</span> Connect with fellow
                  gamers and form communities.
                </p>
                <p>
                  <span className="me-2">&#9679;</span> Play your favorite games
                  and enjoy your time.
                </p>
              </div>
              <div className="col-md-6">
                <div className="blur-shadow-image text-center">
                  <div className="card shadow-lg bg-light">
                    <div className="card-body ">
                      <img
                        src={require("../imgs/Logo.png")}
                        alt="img-shadow"
                        className="img-fluid shadow-xl border-radius-lg max-height-500 "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* row-3 cards*/}
            <div className="mb-5">
              <div className="row">
                <div className="col-lg-8 text-center mx-auto">
                  <p className="mb-1 text-gradient text-warning font-weight-bold text-uppercase display-3 ">
                    Our Work
                  </p>
                  <h3>Explore the Best of Playways</h3>
                </div>
              </div>
              <div className="row mt-4 m-lg-5 p-lg-5 justify-content-center">
                <div className="col-lg-4 col-md-6">
                  <div className="card card-background card-background-mask-dark h-100">
                    <div
                      className="full-background"
                      id="cardImg"
                      // style={{backgroundImage: "url(&#39;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/team-working.jpg&#39;)"}}
                    ></div>
                    <div className="card-body pt-7 text-center">
                      <p className="text-uppercase font-weight-bold text-sm opacity-6">
                        About Playways
                      </p>
                      <h3 className="">What is the Playways!</h3>
                      <p className="opacity-8">
                        Embark on a journey to learn more about the vision and
                        mission of Playways.
                      </p>
                      <Link
                        to={`aboutUs`}
                        type="button"
                        className="btn btn-warning btn-sm mt-3"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="card card-background card-background-mask-dark mt-md-0 mt-4 h-100">
                    <div
                      className="full-background"
                      // style="background-image: url(&#39;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/toboshar.jpg&#39;)"
                    ></div>
                    <div className="card-body pt-7 text-center ">
                      <p className="text-uppercase font-weight-bold text-sm  opacity-6">
                        Game Stations
                      </p>
                      <h3 className="">Find Stations, Book a slot!</h3>
                      <p className=" opacity-8">
                        Explore our network of game stations and book your slot
                        for an immersive gaming experience.
                      </p>
                      <Link
                        to={`/gameStations`}
                        type="button"
                        className="btn btn-warning btn-sm mt-3"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mx-md-auto">
                  <div className="card card-background card-background-mask-dark mt-lg-0 mt-5 h-100">
                    <div
                      className="full-background"
                      // style="background-image: url(&#39;https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/umbrellas.jpg&#39;)"
                    ></div>
                    <div className="card-body pt-7 text-center">
                      <p className="text-uppercase font-weight-bold text-sm  opacity-6">
                        24x7 Support
                      </p>
                      <h3 className="">Check bugs and fix!</h3>
                      <p className=" opacity-8">
                        Our dedicated support team is available 24x7 to address
                        any queries or concerns you may have.
                      </p>
                      <Link
                        to={`/contactUs`}
                        type="button"
                        className="btn btn-warning btn-sm mt-3"
                      >
                        Get Started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* row-5 about
            <div className="mt-lg-5 mb-lg-5 p-lg-5">
              <div className="row">
                <div className="col-lg-6 mx-auto text-center">
                  <h2 className="mb-3">Think about us</h2>
                  <p>
                    That’s the main thing people are controlled by! Thoughts -
                    their perception of themselves!{" "}
                  </p>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-lg-4 col-md-8">
                  <div className="card m-1">
                    <div className="card-body bg-golden">
                      <img
                        src={require("../imgs/footballavif.avif")}
                        alt="..."
                        className="avatar avatar-lg border-radius-lg object-fit-cover ratio shadow mt-n4"
                      />
                      <div className="author">
                        <div className="name">
                          <span>Mathew Glock</span>
                          <div className="stats">
                            <small>
                              <i className="far fa-clock"></i> 5 min read
                            </small>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4">
                        "If you have the opportunity to play this game of life
                        you need to appreciate every moment."
                      </p>
                      <div className="rating mt-3">
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-8 ms-md-auto">
                  <div className="card bg-gradient-primary m-1">
                    <div className="card-body bg-golden">
                      <img
                        src={require("../imgs/footballavif.avif")}
                        alt="..."
                        className="avatar avatar-lg border-radius-lg object-fit-cover ratio shadow mt-n4"
                      />
                      <div className="author align-items-center">
                        <div className="name">
                          <span className="">Mathew Glock</span>
                          <div className="stats">
                            <small className="">Posted on 28 February</small>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4">
                        "If you have the opportunity to play this game of life
                        you need to appreciate every moment."
                      </p>
                      <div className="rating mt-3">
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-8">
                  <div className="card m-1">
                    <div className="card-body bg-golden">
                      <img
                        src={require("../imgs/footballavif.avif")}
                        alt="..."
                        className="avatar avatar-lg border-radius-lg object-fit-cover ratio shadow mt-n4"
                      />
                      <div className="author">
                        <div className="name">
                          <span>Mathew Glock</span>
                          <div className="stats">
                            <small>
                              <i className="far fa-clock"></i> 5 min read
                            </small>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4">
                        "If you have the opportunity to play this game of life
                        you need to appreciate every moment."
                      </p>
                      <div className="rating mt-3">
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                        <FaStar className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="horizontal dark my-5" />
              <div className="row justify-content-center text-center">
                <div className="col">
                  <FaInstagram className="fs-1 text-center" />
                </div>
                <div className="col">
                  <FaFacebook className="fs-1 text-center" />
                </div>
                <div className="col">
                  <FaTwitter className="fs-1 text-center" />
                </div>
                <div className="col">
                  <FaGithub className="fs-1 text-center" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
