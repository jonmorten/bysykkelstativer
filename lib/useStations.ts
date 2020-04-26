import React from "react";

import {
  ApiStationInfo,
  ApiStationInfoResponse,
  ApiStationStatusResponse,
  Station,
} from "../types";

type StationInfo = Pick<ApiStationInfo, "address" | "lat" | "lon" | "name">;

const API_BASE = "https://gbfs.urbansharing.com/oslobysykkel.no";

export const useStations = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [stations, setStations] = React.useState<Station[]>([]);

  React.useEffect(() => {
    const fetchStations = async () => {
      setError(false);
      setLoading(true);

      try {
        // Makes CORS work for localhost
        const options =
          process.env.NODE_ENV === "production"
            ? {
                headers: { "Client-Identifier": "jonmorten-test" },
              }
            : undefined;

        const informationRes: ApiStationInfoResponse = await fetch(
          `${API_BASE}/station_information.json`,
          options
        ).then((response) => response.json());

        const statusRes: ApiStationStatusResponse = await fetch(
          `${API_BASE}/station_status.json`,
          options
        ).then((response) => response.json());

        const information = informationRes.data.stations;
        const status = statusRes.data.stations;

        const infoMap = new Map<string, StationInfo>();

        information.forEach(({ address, name, lat, lon, station_id }) => {
          infoMap.set(station_id, {
            address,
            lat,
            lon,
            name,
          });
        });

        const stationsData = status
          .filter(({ station_id }) => infoMap.has(station_id))
          .map((stationStatus) => {
            const { address, lat, lon, name } = infoMap.get(
              stationStatus.station_id
            );

            return {
              address,
              bikesAvailable: stationStatus.num_bikes_available,
              docksAvailable: stationStatus.num_docks_available,
              id: stationStatus.station_id,
              inService:
                stationStatus.is_installed === 1 &&
                stationStatus.is_renting === 1 &&
                stationStatus.is_returning === 1,
              lat,
              lon,
              name,
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));

        setStations(stationsData);
      } catch (_) {
        setError(true);
      }

      setLoading(false);
    };

    fetchStations();
  }, []);

  return {
    error,
    loading,
    stations,
  };
};
