import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApis from "../apis/UserApis";
import { FaEllipsisV } from "react-icons/fa";

function ProfilePage() {
  const [user, setUser] = useState();
  const [activeTab, setActiveTab] = useState("Profile");
  const [showOptions, setShowOptions] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    document.title = "Play Ways - Profile";
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userApis.getUserDetails(userId);
        setUser(response.data.user);
      } catch (error) {
        console.log("Error in fetching data :", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="container-fluid px-md-5 bg-User" id="profile">
      <div className="">
        <div className="row justify-content-center align-items-center d-flex flex-column p-5">
          <div className="col-md-3 justify-content-center">
            <div className="text-center">
              <img
                src={
                  user?.ProfileImg
                    ? `${process.env.REACT_APP_baseUrl}${user.ProfileImg}`
                    : require("../imgs/Profile_avatar4.png").default
                }
                alt="User"
                className="img-fluid rounded-circle ratio object-fit-cover shadow-lg  bg-light"
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  maxWidth: "250px",
                  minWidth: "250px",
                  minHeight: "250px",
                }}
              />
            </div>
            <div className="text-center mt-3">
              <h2 className=" m-0">{user?.userName || "User"}</h2>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className=" card shadow mb-5 m-0 p-0">
            <div className="menu">
              <ul className="nav nav-tabs justify-content-center mt-1">
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className={`nav-link ${
                      activeTab === "Profile" && "active"
                    }`}
                    onClick={() => handleTabClick("Profile")}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div className="content mt-md-2 p-md-4">
              {activeTab === "Profile" && (
                <div className="profile-content mt-md-2 p-md-4 p-3">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="card bg-info bg-opacity-10 mt-md-1">
                        <div className="card-body">
                          <div className="row justify-content-end ">
                            <div className="text-end position-relative">
                              <FaEllipsisV
                                onClick={handleOptionsClick}
                                style={{ cursor: "pointer" }}
                              />
                              {showOptions && (
                                <div className="options-dropdown bg-light">
                                  <ul className="options-menu position-absolute list-unstyled text-center">
                                    <li>
                                      <Link
                                        to={`/edit-profile/${userId}`}
                                        className="btn w-100"
                                      >
                                        Update Profile
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                          <h4 className="card-title">Profile Information</h4>
                          <p className="card-text">
                            <strong>Name:</strong>{" "}
                            {user?.userName || "User name"}
                          </p>
                          <p className="card-text">
                            <strong>Email:</strong>{" "}
                            {user?.email || "email@gmail.com"}
                          </p>
                          <p className="card-text">
                            <strong>Phone:</strong>{" "}
                            {user?.phone || "123-456-7890"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
