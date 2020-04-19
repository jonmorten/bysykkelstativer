import React from "react";

import { Station } from "../types";
import { useStations } from "../lib/useStations";

const Container: React.FC = ({ children }) => (
  <div className="max-w-screen-sm mx-auto p-4">{children}</div>
);

const StationList: React.FC<{ stations: Station[] }> = ({ stations }) => {
  if (!stations.length) {
    return <>Ingen stativer i systemet!</>;
  }

  return (
    <div>
      <p className="mb-4">
        🚲ledige sykler <br /> 🔓ledige låser
      </p>

      {stations.map((station) => (
        <div key={station.id} className="mb-3">
          <p>
            <strong>{station.name}</strong>
            {station.name !== station.address && (
              <>
                {" "}
                <small>{station.address}</small>
              </>
            )}
          </p>
          <p>
            <span className="mr-2">🚲{station.bikesAvailable}</span>
            <span className="mr-2">🔓{station.docksAvailable}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

const IndexPage = () => {
  const { error, loading, stations } = useStations();

  return (
    <Container>
      <h1 className="text-3xl mb-2">Bysykkelstativer</h1>

      {error && <p>Kunne ikke hente info om stativene! Prøv igjen senere.</p>}

      {loading && <p>Henter info om stativene ...</p>}

      {!loading && !error && <StationList stations={stations} />}
    </Container>
  );
};

export default IndexPage;
