import React from "react";
import Link from "next/link";

import { useStations } from "../lib/useStations";
import Anchor from "../components/Anchor";
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
              <Anchor>Se stativer på kart</Anchor>
            </Link>
          </p>

          <StationsList stations={stations} />
        </>
      )}
    </Container>
  );
};

export default IndexPage;
