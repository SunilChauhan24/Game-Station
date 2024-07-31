import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../User/Home";
import Login from "../User/Login";
import SignUp from "../User/SignUp";
import BookingInterface from "../User/BookingInterface";
import PaymentGateway from "../User/PaymentGateway";
import ForgotPassword from "../User/ForgotPassword";
import ResetPassword from "../User/ResetPassword";
import ProfilePage from "../User/ProfilePage";
import EditProfilePage from "../User/EditProfilePage";
import FAQPage from "../User/FAQPage";
import TermsAndConditions from "../User/TermsAndConditions";
import NoPage from "../User/NoPage";
import FeedbackPage from "../User/FeedbackPage";
import OtpVerification from "../User/OtpVerification";
import ContactUs from "../User/ContactUs";
import GameStations from "../User/GameStations";
import GsProfile from "../User/GsProfile";
import AboutUs from "../User/AboutUs";
import Blogs from "../User/Blogs";
import PrivateRoute from "../User/PrivateRoute";
import Navbar from "../User/Navbar";
import Games from "../User/Games";
import MyBookings from "../User/MyBookings";
import "../../App.css"

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="otpVerification" element={<OtpVerification />} />
      <Route path="FAQs" element={<FAQPage />} />
      <Route path="T&C" element={<TermsAndConditions />} />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <Navbar />
          </PrivateRoute>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="edit-profile/:userId" element={<EditProfilePage />} />
        <Route path="bookings" element={<MyBookings />} />

        <Route path="gameStations" element={<GameStations />} />
        <Route path="gameStation/:stationId" element={<GsProfile />} />
        <Route path="gameStation/:stationId/games" element={<Games />} />
        <Route
          path="gameStation/:stationId/:gameId/booking"
          element={<BookingInterface />}
        />
        <Route path="paymentGateway" element={<PaymentGateway />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
