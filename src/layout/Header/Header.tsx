import React from "react";
import logo from "../../assets/medly-logo.png";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <a href="/">
          <img src={logo} alt="Logo" className="header-logo" />
        </a>
      </div>
      <div className="header-right">Ocelot</div>
    </div>
  );
};

export default Header;
