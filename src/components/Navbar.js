import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const auth_token = localStorage.getItem("auth_token");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin_id");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="m-2">
        SMS
      </NavLink>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavAltMarkup"
      >
        {!auth_token ? (
          <div className="navbar-nav">
            <NavLink to="/register" className="m-2">
              Sign up
            </NavLink>
            <NavLink to="/login" className="m-2">
              Login
            </NavLink>
          </div>
        ) : (
          <div className="navbar-nav">
            <button type="button" className="btn btn-secondary m-2" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
