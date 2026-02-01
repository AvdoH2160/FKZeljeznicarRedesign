import React from "react";

// primjer sjedišta po redu i koloni
const generateSeats = (rows = 5, cols = 8) => {
  const seats = [];
  const seatSize = 20;
  const gap = 5;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      seats.push({
        x: c * (seatSize + gap),
        y: r * (seatSize + gap),
        id: `R${r + 1}C${c + 1}`
      });
    }
  }
  return seats;
};

const SectorDetail = ({ sectorId }) => {
  const seats = generateSeats(8, 10); // 8 redova, 10 kolona
  return (
    <svg width="800" height="600" viewBox="0 0 250 250" style={{ border: "2px solid #333", borderRadius: "8px" }}>
      <text x="125" y="20" textAnchor="middle" fontSize="24" fontWeight="bold">
        Sektor {sectorId}
      </text>
      {seats.map((seat) => (
        <rect
          key={seat.id}
          x={seat.x}
          y={seat.y + 30}
          width={20}
          height={20}
          fill="#007BFF"
          stroke="#000"
          strokeWidth={1}
          rx={3}
          ry={3}
        />
      ))}
    </svg>
  );
};

export default SectorDetail;