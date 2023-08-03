import React, { useEffect } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartTotal } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { googleLogout } from "@react-oauth/google";
import { clearUserDetails } from "../../store/appSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const navigate = useNavigate();

  const logoutMethod = () => {
    googleLogout();
    dispatch(clearUserDetails());
    navigate("/login");
    localStorage.clear();
  };

  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="container">
          <div className="navbar-top flex flex-between">
            <Link to="/" className="navbar-brand">
              <span className="text-gold">Online</span>
              <span className="text-red">Store</span>
            </Link>

            {location.pathname !== "/login" ? (
              <div className="navbar-btns">
                <Link to="/cart" className="add-to-cart-btn flex">
                  <span className="btn-ico">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  <div className="btn-txt fw-5">
                    Cart
                    <span className="cart-count-value">{totalItems}</span>
                  </div>
                </Link>
              </div>
            ) : null}
            <div className="btn-txt fw-5">
              {location.pathname !== "/login" ? (
                <button onClick={logoutMethod}>
                  <LogoutIcon fontSize="large" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
