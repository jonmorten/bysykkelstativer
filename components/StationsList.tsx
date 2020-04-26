import React from "react";

import { Station } from "../types";

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

export default StationList;
