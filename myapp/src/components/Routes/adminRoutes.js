import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NoPage from "../User/NoPage";
import AdminSidebar from "../admin/AdminSidebar";
import AdminLogin from "../admin/AdminLogin";
import PrivateRoute from "../admin/PrivateRoutes";
import { GridLoader } from "react-spinners";

const Dashboard = React.lazy(() => import("../admin/Dashboard"));
const GsDetails = React.lazy(() => import("../admin/GsDetails"));
const Bookings = React.lazy(() => import("../admin/Bookings"));
const Quotes = React.lazy(() => import("../admin/Quotes"));
const Users = React.lazy(() => import("../admin/Users"));
const Games = React.lazy(() => import("../admin/Games"));
const Feedbacks = React.lazy(() => import("../admin/Feedbacks"));
const Payments = React.lazy(() => import("../admin/Payments"));
const Hosts = React.lazy(() => import("../admin/Hosts"));
const HostStations = React.lazy(() => import("../admin/HostStations"));
const GameStationProfile = React.lazy(() =>
  import("../admin/GameStationProfile")
);
const PasswordChange = React.lazy(() => import("../admin/PasswordChange"));
const Admins = React.lazy(() => import("../admin/Admins"));
const Blogs = React.lazy(() => import("../admin/Blogs"));

const AdminRoutes = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <GridLoader type="Oval" color="#FFD700" height={50} width={50} />
          </div>
        }
      >
        <Routes>
          <Route path="login" element={<AdminLogin />} />
          <Route path=":adminId/changePassword" element={<PasswordChange />} />

          <Route
            path="*"
            element={
              <PrivateRoute>
                <AdminSidebar />
              </PrivateRoute>
            }
          >
            {/* Lazy loaded Dashboard component */}
            <Route index element={<Dashboard />} />
            <Route path=":adminId/admins" element={<Admins />} />
            <Route path=":adminId/hosts" element={<Hosts />} />
            <Route path=":adminId/hosts/:hostId" element={<HostStations />} />
            <Route
              path=":adminId/station/:stationId"
              element={<GameStationProfile />}
            />
            <Route path=":adminId/dashboard" element={<Dashboard />} />
            <Route path=":adminId/feedbacks" element={<Feedbacks />} />
            <Route path=":adminId/payments" element={<Payments />} />
            <Route path=":adminId/quotes" element={<Quotes />} />
            <Route path=":adminId/games" element={<Games />} />
            <Route path=":adminId/users" element={<Users />} />
            <Route path=":adminId/blogs" element={<Blogs />} />
            <Route path=":adminId/bookings" element={<Bookings />} />
            <Route path=":adminId/gameStations" element={<GsDetails />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default AdminRoutes;
