import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

interface Props {
  google: {
    zoom: number;
  };
}

const GoogleMap = (props: any) => {
  const lat = props.location[1];
  const lng = props.location[0];
  return (
    <Map google={props.google} zoom={15} initialCenter={{ lat, lng }}>
      <Marker title={"Delivery Address"} position={{ lat, lng }} />
    </Map>
  );
};

export { GoogleMap };

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
})(GoogleMap);
