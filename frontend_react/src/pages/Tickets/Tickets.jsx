import React, { useState } from "react";
import StadiumMap from "../../components/StadiumMap/StadiumMap";

const Tickets = () => {
  const [selectedSectors, setSelectedSectors] = useState([]);

  const handleSelectSector = (sector) => {
    setSelectedSectors((prev) => {
      if (prev.includes(sector)) {
        // ako je već selektovan, ukloni ga
        return prev.filter((s) => s !== sector);
      } else {
        return [...prev, sector];
      }
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", marginTop: "100px"}}>
      <h1>Izaberite sektor</h1>
      <StadiumMap onSelectSector={handleSelectSector} />

      <div style={{ marginTop: "20px" }}>
        <h2>Selektovani sektori:</h2>
        {selectedSectors.length > 0 ? (
          <ul>
            {selectedSectors.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ) : (
          <p>Nijedan sektor nije selektovan.</p>
        )}
      </div>
    </div>
  );
};

export default Tickets;