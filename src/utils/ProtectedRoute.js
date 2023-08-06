import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../store/appSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated =
    localStorage.getItem("username") || localStorage.getItem("userDetails");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      let details = localStorage.getItem("userDetails");
      console.log("details", typeof details);
      dispatch(setUserDetails(JSON.parse(details)));
    }
  }, [isAuthenticated, navigate, dispatch]);

  return (
    <React.Fragment>
      {isAuthenticated ? children : navigate("/login")}
    </React.Fragment>
  );
};

export default ProtectedRoute;
