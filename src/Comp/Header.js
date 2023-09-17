import "../Comp/style.css";
import React from "react";
import swiggylogo from "../Imports/swiggyLogo.png";

const Title = () => (
  <a href="/">
    <img alt="logo" className="logo" src={swiggylogo}></img>
  </a>
);

export default function Header() {
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>Contact Us</li>
          <li>About Us</li>
        </ul>
      </div>
    </div>
  );
}
