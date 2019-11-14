import React from "react";
import logo from "../../../assets/medly-logo.png";

import "./Header.scss";

const Header = props => {
  return (
    <div className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="header-logo" />
      </div>
      <div className="header-right"></div>
    </div>
  );
};

export default Header;
