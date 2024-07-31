// EditProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userApis from "../apis/UserApis";

function EditProfilePage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
    ProfileImg: null,
  });
  const [profilePicPreview, setProfilePicPreview] = useState(
    require("../imgs/Profile_avatar4.png")
  );

  useEffect(() => {
    document.title = "Play Ways - Edit Profile";
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await userApis.getUserDetails(userId);
        const userDetails = response.data.user;
        setFormData(response.data.user);
        if (userDetails.ProfileImg) {
          setProfilePicPreview(
            `${process.env.REACT_APP_baseUrl}${userDetails.ProfileImg}`
          );
        } else {
          setProfilePicPreview(require("../imgs/Profile_avatar4.png"));
        }
      } catch (error) {
        console.log("Error in fetching data :", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      ProfileImg: file,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicPreview(require("../imgs/Profile_avatar4.png"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userName", formData.userName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("ProfileImg", formData.ProfileImg);
      
      const response = await userApis.updateUserDetails(userId, formDataToSend);
      console.log("User data updated:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <div id="bg-serach">
        <div className="container mb-5 mt-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="card-header">
                <h1 className="mt-4">Edit Profile</h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group mx-auto text-center mt-3">
                  <input
                    type="file"
                    name="ProfileImg"
                    id="profileImgInput"
                    className="form-control"
                    style={{ display: "none" }}
                    accept="image/*"
                    multiple={false}
                    onChange={handleFileChange}
                  />
                  <img
                    src={profilePicPreview}
                    alt=""
                    width={200}
                    height={200}
                    className="img-fluid rounded-circle border"
                    style={{
                      aspectRatio: "1/1",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      document.getElementById("profileImgInput").click()
                    }
                    id="ProfilePicPreview"
                  />
                </div>
                <div className="text-center mb-2 mx-auto">
                  <label>Profile Picture</label>
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="userName"
                    className="form-control"
                    placeholder="Name"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-3 text-center">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => navigate("/profile")}
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-golden">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfilePage;
