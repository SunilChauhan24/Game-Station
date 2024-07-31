import React from "react";
import { Modal, Button } from "react-bootstrap";
import Logo from "./imgs/Logo.png";

const UserProfileModal = ({ show, userData, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered className="custom-modal-width">
      <Modal.Header closeButton>
        <Modal.Title>User Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-3 ">
          <div className="col-md-6">
            <img
              src={
                userData.ProfileImg
                  ? `${process.env.REACT_APP_baseUrl}${userData.ProfileImg}`
                  : Logo
              }
              className="img-fluid rounded-circle border"
              alt="User"
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
                maxWidth: "250px",
                minWidth: "250px",
                minHeight: "250px",
                maxHeight: "250px",
              }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-4">User Profile</h2>
            <p>
              <b>Name:</b>
              {userData.userName}
            </p>
            <p>
              <b>Email:</b> {userData.email}
            </p>
            <p>
              <b>Phone:</b> {userData.phone}
            </p>
            <p>
              <b>IsPrimeUser: </b>
              {userData.IsPrimeUser ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileModal;
