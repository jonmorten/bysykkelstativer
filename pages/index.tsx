import React from "react";
import Link from "next/link";

import { Station } from "../types";
import { useStations } from "../lib/useStations";

const Container: React.FC = ({ children }) => (
  <div className="max-w-screen-sm mx-auto p-4">{children}</div>
);

const StationList: React.FC<{ stations: Station[] }> = ({ stations }) => {
  const [filter, setFilter] = React.useState("");

  if (!stations.length) {
    return <>Ingen stativer i systemet!</>;
  }

  const regex = new RegExp(filter, "i");
  const filteredStations = filter
    ? stations.filter(({ name }) => name.match(regex))
    : stations;

  return (
    <div>
      <p className="mb-4">
        🚲ledige sykler <br /> 🔓ledige låser
      </p>

      <div className="mb-5 px-3 py-2 bg-gray-700 rounded">
        <label>
          <span className="text-white mr-3">Finn ditt stativ</span>

          <input
            placeholder="Søk på navn"
            className="rounded px-3 py-1"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
            value={filter}
          />
        </label>
      </div>

      {filter && filteredStations.length === 0 && (
        <p>
          Fant ingen stativ for {"«"}
          {filter}
          {"»"}
        </p>
      )}

      {filteredStations.map((station) => (
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

      {!loading && !error && (
        <>
          <p className="mb-2">
            <Link href="/map">
              <a className="text-blue-500 hover:text-blue-800">
                Se stativer på kart
              </a>
            </Link>
          </p>

          <StationList stations={stations} />
        </>
      )}
    </Container>
  );
};

export default IndexPage;
