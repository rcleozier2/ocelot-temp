import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

interface Props {
  google: {
    zoom: number;
  };
}

const GoogleMap = (props: any) => {
  const lat = props.location[1];
  const lng = props.location[0];
  return <Map google={props.google} zoom={15} initialCenter={{ lat, lng }} />;
};

export { GoogleMap };

export default GoogleApiWrapper({
  apiKey: ""
})(GoogleMap);
