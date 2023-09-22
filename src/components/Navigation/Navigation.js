import React from "react";
import "./Navigation.css";
import Logo from "../Logo/Logo";

const Navigation = ({ onRouteChange, loggedIn }) => {
  return (
    <div>
      <nav className="container-fluid d-flex justify-content-between align-items-center mt-3">
        <Logo />
        {loggedIn && (
          <p
            onClick={() => onRouteChange("signin")}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        )}
        {!loggedIn && (
          <div className="d-flex">
            <p
              onClick={() => onRouteChange("signin")}
              className="f3 link dim black underline pa3 pointer"
            >
              Sign In
            </p>
            <p
              onClick={() => onRouteChange("register")}
              className="f3 link dim black underline pa3 pointer"
            >
              Register
            </p>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
