import React from "react";
import logo from "../../assets/medly-logo.png";
import {Link} from "react-router-dom";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
      <Link to="/">
          <img src={logo} alt="Logo" className="header-logo" />
        </Link>
      </div>
      <div className="header-right">Ocelot</div>
    </div>
  );
};

export default Header;
