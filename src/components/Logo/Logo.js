import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import logo from "./thinking.png";

function Logo() {
  return (
    <Tilt className="tilt-wrapper" style={{ width: "70px" }}>
      <img className="p-2" src={logo} alt="" width="70" />
    </Tilt>
  );
}

export default Logo;
