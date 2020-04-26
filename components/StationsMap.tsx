import React from "react";
import ReactMapGL, { Marker, NavigationControl, Popup } from "react-map-gl";

import { Station } from "../types";

type Props = {
  stations: Station[];
};

const StationMarker: React.FC<{
  setActiveStation: Function;
  station: Station;
}> = ({ setActiveStation, station }) => (
  <Marker latitude={station.lat} longitude={station.lon}>
    <span
      data-testid={station.name}
      className="cursor-pointer"
      onClick={() => setActiveStation(station)}
    >
      💙
    </span>
  </Marker>
);

const Map: React.FC<Props> = ({ stations }) => {
  const [viewport, setViewport] = React.useState({
    latitude: 59.91768,
    longitude: 10.73424,
    zoom: 11,
  });

  const [activeStation, setActiveStation] = React.useState<Station>(null);

  return (
    <ReactMapGL
      height="70vh"
      mapboxApiAccessToken="pk.eyJ1Ijoiam9ubW9ydGVuIiwiYSI6ImNrOGFmd3MxejAxdW0zbG82ZDQxNWlramQifQ.4nkTbHZHBit6hAYRdb-6kw"
      mapStyle="mapbox://styles/jonmorten/ck9h3hlr90zeh1ir043zec2yp"
      width="100%"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      {...viewport}
    >
      <div className="absolute right-0 p-5">
        <NavigationControl />
      </div>

      {stations.map((station) => (
        <StationMarker
          key={station.id}
          station={station}
          setActiveStation={setActiveStation}
        />
      ))}

      {activeStation && (
        <Popup
          latitude={activeStation.lat}
          longitude={activeStation.lon}
          closeButton
          closeOnClick
          onClose={() => setActiveStation(null)}
          anchor="top"
        >
          <p className="pb-3">
            <strong>{activeStation.name}</strong>

            {activeStation.name !== activeStation.address && (
              <>
                <br />
                <small>{activeStation.address}</small>
              </>
            )}
          </p>

          <p>🚲 {activeStation.bikesAvailable} ledige sykler</p>
          <p>🔓 {activeStation.docksAvailable} ledige låser</p>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
