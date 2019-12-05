import React from "react";
import { Link } from "react-router-dom";

import "./Navigation.scss";

const Navigation = () => {
  return (
    <div className="row p-2 mt-n1">
      <div className="navigation col-12 p-2 mt-n4">
        <Link to="/">Realtime Delivery Data</Link>
        <span className="navigation-spacer"> &bull;  </span>
        <Link to="/historical">Historical Delivery Data</Link>
      </div>
    </div>
  );
};

export default Navigation;
