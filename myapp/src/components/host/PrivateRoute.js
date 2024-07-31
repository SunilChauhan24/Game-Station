import { useEffect } from "react";
import { useContext } from "react";
import { HostContext } from "../context/HostContext";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(HostContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/host/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default PrivateRoute;