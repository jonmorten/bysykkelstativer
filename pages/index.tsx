import React from "react";
import Link from "next/link";

import { useStations } from "../lib/useStations";
import StationsList from "../components/StationsList";

const Container: React.FC = ({ children }) => (
  <div className="max-w-screen-sm mx-auto p-4">{children}</div>
);

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

          <StationsList stations={stations} />
        </>
      )}
    </Container>
  );
};

export default IndexPage;
