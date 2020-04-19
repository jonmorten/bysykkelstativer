import React from "react";

type ID = string;

type Station = {
  id: ID;
  address: string;
  bikesAvailable: number;
  docksAvailable: number;
  inService: boolean;
  name: string;
};

const mocks: Station[] = [
  {
    id: "627",
    address: "Skøyen Stasjon",
    bikesAvailable: 7,
    docksAvailable: 5,
    inService: true,
    name: "Skøyen Stasjon",
  },
  {
    id: "623",
    address: "7 Juni Plassen",
    bikesAvailable: 4,
    docksAvailable: 8,
    inService: true,
    name: "7 Juni Plassen",
  },
  {
    id: "610",
    address: "Sotahjørnet",
    bikesAvailable: 4,
    docksAvailable: 9,
    inService: true,
    name: "Sotahjørnet",
  },
];

const Container: React.FC = ({ children }) => (
  <div className="max-w-screen-sm mx-auto p-4">{children}</div>
);

const StationList: React.FC<{ stations: Station[] }> = ({ stations }) => {
  if (!stations.length) {
    return <>Ingen stativer i systemet!</>;
  }

  return (
    <div>
      {stations.map((station) => (
        <div key={station.id}>
          <strong>{station.name}</strong>
          {station.name !== station.address && <em>station.address</em>}
          <p>🚲{station.bikesAvailable} sykler</p>
          <p>🔓{station.docksAvailable} ledige låser</p>
        </div>
      ))}
    </div>
  );
};

const IndexPage = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [stations, setStations] = React.useState<Station[]>(mocks);

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
