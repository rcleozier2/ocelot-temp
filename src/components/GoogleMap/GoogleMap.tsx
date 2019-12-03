import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import { any, number } from "prop-types";

interface Props {
  google: {
    zoom: number;
  };
}

const mapStyles = {
  width: "100%",
  height: "100%"
};

const GoogleMap = (props: any) => {
  const lat = props.location[1];
  const lng = props.location[0];
  return <Map google={props.google} zoom={15} initialCenter={{ lat, lng }} />;
};

export { GoogleMap };

export default GoogleApiWrapper({
  apiKey: ""
})(GoogleMap);
