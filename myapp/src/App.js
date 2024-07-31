import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import NoPage from "./components/User/NoPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./components/Routes/adminRoutes";
import HostRoutes from "./components/Routes/HostRoutes";
import UserRoutes from "./components/Routes/UserRoutes";
import { UserProvider } from "./components/context/UserContext";
import { AdminProvider } from "./components/context/AdminContext";
import { HostProvider } from "./components/context/HostContext";
import Footer from "./components/User/Footer"

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route
            path="/*"
            element={
              <UserProvider>
                <UserLayout />
              </UserProvider>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/*"
            element={
              <AdminProvider>
                <AdminLayout />
              </AdminProvider>
            }
          />

          {/* Host */}
          <Route
            path="/host/*"
            element={
              <HostProvider>
                <HostLayout />
              </HostProvider>
            }
          />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </>
  );
}

function UserLayout() {
  return (
    <>
      <UserRoutes />
      <Footer/>
    </>
  );
}

function AdminLayout() {
  return <AdminRoutes />;
}

function HostLayout() {
  return (
    <>
      <HostRoutes />
    </>
  );
}

export default App;
