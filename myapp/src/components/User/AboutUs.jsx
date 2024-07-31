import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  useEffect(() => {
    document.title = "Play Ways - About Us";
  }, []);
  return (
    <>
      <div>
        <div className="position-relative">
          <img
            src={require("../imgs/illustrations/aboutUs.png")}
            alt="Feedback"
            className="img-fluid w-100 h-50"
            style={{
              minHeight: "60vh",
              aspectRatio: "16/3",
              objectFit: "cover",
              filter: "brightness(50%)",
            }}
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center ">
            <h1
              className="text-white text-lg text-sm text-xs responsive-text animate__animated animate__fadeInDown"
              style={{ fontSize: "60px", fontFamily: "satisfya" }}
            >
              About Us
            </h1>
            <p className="text-white mt-4 animate__animated animate__fadeInDown">
              We are a team dedicated to providing the best services to our
              customers.
            </p>
          </div>
        </div>

        <div className=" ">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb ms-4 mt-2">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-warning">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    About Us
                  </li>
                </ol>
              </nav>
            </div>
          </nav>
        </div>

        <div className="container">
          <div className="row mt-3 justify-content-center">
            <div className=" mb-3">
              <div className="card  bg-secondary bg-opacity-10 rounded-5 border-0 shadow">
                <div className="card-body d-flex flex-column justify-content-center">
                  <div className=" p-5">
                    <h1 className="text-center mb-3 display-3 text-golden">
                      About Us
                    </h1>
                    <h2 className="mt-5 mb-3">
                      Welcome to PlayWays - Your Ultimate Gaming Destination!
                    </h2>

                    <p>
                      At PlayWays, we're passionate about providing an immersive
                      gaming experience for enthusiasts like you. Whether you're
                      a casual gamer or a competitive player, our platform is
                      designed to bring the thrill of gaming to your fingertips.
                    </p>

                    <h4 className="">Our Mission</h4>

                    <p>
                      Our mission at PlayWays is to create a seamless and
                      enjoyable environment for gamers to connect, compete, and
                      have a blast. We believe in the power of gaming to bring
                      people together, foster friendships, and unleash the joy
                      of play.
                    </p>

                    <h4 className="">What Sets Us Apart</h4>

                    <ul>
                      <li>Diverse Game Selection</li>

                      <p>
                        Choose from a wide range of games that cater to
                        different tastes and preferences. From classic favorites
                        to the latest releases, we've got something for
                        everyone.
                      </p>

                      <li> Easy Slot Booking</li>

                      <p>
                        Our user-friendly platform allows you to effortlessly
                        book gaming slots at your convenience. No more waiting
                        in line – reserve your spot and dive into the gaming
                        action.
                      </p>

                      <li>Community Engagement</li>

                      <p>
                        Join our vibrant gaming community where you can connect
                        with fellow gamers, share strategies, and stay updated
                        on the latest gaming trends and events.
                      </p>
                    </ul>
                    <h4 className="">Our Team</h4>

                    <p>
                      PlayWays is fueled by a team of dedicated gamers,
                      developers, and enthusiasts who are committed to enhancing
                      your gaming experience. Meet the minds behind the scenes:
                    </p>

                    <p>
                      <b>- [Founder Name]:</b> The visionary behind PlayWays,
                      [Founder Name] is driven by a passion for gaming and a
                      commitment to creating an inclusive gaming community.
                    </p>

                    <p>
                      <b>- [Development Team]:</b> Our skilled development team
                      works tirelessly to ensure a smooth and enjoyable
                      platform, bringing your gaming dreams to life.
                    </p>

                    <p>
                      <b>- [Community Managers]:</b> Meet the friendly faces who
                      keep our gaming community buzzing with excitement and
                      engagement.
                    </p>

                    <h4 className="">Join the PlayWays Movement</h4>

                    <p>
                      Ready to level up your gaming experience? Join PlayWays
                      today and become a part of our growing community. Whether
                      you're a solo player or a team, there's always a spot for
                      you at PlayWays.
                    </p>

                    <p>Let the games begin!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row d-flex justify-content-center p-5 align-items-center "
            style={{ minHeight: "80vh" }}
          >
            <div className="text-center">
              <h1 className="display-4 text-dark mb-5">The PlayWays Team</h1>
            </div>
            <div className="col-md-3">
              <div className="card border-0 text-center teamCard">
                <img
                  src={require("../imgs/Profile_avatar4.png")}
                  className="card-img-top img-fluid rounded-circle border teamCard-img"
                  alt=""
                />
                <div className="card-body text-center">
                  <h4 className="card-title text-golden teamCard-text">Manish Kumavat</h4>
                  <p className="card-text text-muted teamCard-text">Backend Developer</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 text-center teamCard">
                <img
                  src={require("../imgs/Profile_avatar4.png")}
                  className="card-img-top img-fluid rounded-circle border teamCard-img"
                  alt=""
                />
                <div className="card-body text-center">
                  <h4 className="card-title text-golden teamCard-text">Vivek Rathod</h4>
                  <p className="card-text text-muted teamCard-text">Frontend Developer</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 text-center teamCard">
                <img
                  src={require("../imgs/Profile_avatar4.png")}
                  className="card-img-top img-fluid rounded-circle border teamCard-img"
                  alt=""
                />
                <div className="card-body text-center">
                  <h4 className="card-title text-golden teamCard-text">Kuldeep Rathod</h4>
                  <p className="card-text text-muted teamCard-text">Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="row d-flex justify-content-center align-items-center mb-5"
            style={{ minHeight: "80vh" }}
          >
            <div className="col-md-8 mb-5">
            <h1 className="display-5 text-center text-dark mb-5">Company details</h1>

              <div className="text-center">
                <img
                  src={require("../imgs/cec-logo.webp")}
                  alt="cec"
                  className="img-fluid"
                  width={"150px"}
                  style={{
                    mixBlendMode: "multiply",
                  }}
                />
              </div>
              <div className="text-center mt-4">
                <h4 className="text-muted">
                  Special thanks to cec.org for their invaluable help and
                  support throughout this project.
                </h4>
                <a
                  href="https://www.cecyours.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-golden mt-3"
                >
                  View More About CEC
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
