import React, { useEffect, useState } from "react";
import "./tickets.css"
import { useParams, useNavigate } from "react-router-dom";
import StadiumMap from "../../components/StadiumMap/StadiumMap";
import { getImageUrl } from "../../services/imageService";
import api from "../../services/api";

const Tickets = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const TRIBINE = {
    A: "Zapad",
    B: "Sjever",
    C: "Istok",
    D: "Jug"
  };

  const tribina =
  selectedSector
    ? TRIBINE[selectedSector.code.charAt(0)]
    : null;

  document.title= "Ulaznice - FK Željezničar";
  useEffect(() => {
      const loadData = async () => {
        try {
          const resGame = await api.get(`/games/${gameId}`);
          if (!resGame.data) {
            navigate("/");
            return;
          }

          const g = resGame.data;

          const iso = g.kickOffTime.includes("T")
            ? g.kickOffTime
            : g.kickOffTime.replace(" ", "T");

          const date = new Date(iso);

          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();

          const hour = String(date.getHours()).padStart(2, "0");
          const minute = String(date.getMinutes()).padStart(2, "0");

          const formattedGame = {
            ...g,
            kickOffDateFormatted: `${day}.${month}.${year}`,
            kickOffTimeFormatted: `${hour}:${minute}`,
            kickOffFormatted: `${day}.${month}.${year} • ${hour}:${minute}`
          };

          setGame(formattedGame);

          const resSectors = await api.get(`/tickets/sectors/${gameId}`);
          setSectors(resSectors.data);

        } catch (err) {
          console.error(err);
        }
      };

      loadData();
    }, [gameId, navigate]);

  const handleSelectSector = (sectorCode) => {
    const sector = sectors.find(s => s.code === sectorCode);
    setSelectedSector(sector);
    setQuantity(1);
  };

  const buyTicket = async () => {
    if (!selectedSector || !game) return;

    try {
      await api.post("/tickets/buy", {
        gameId: game.id,
        sectorCode: selectedSector.code, 
        quantity: quantity               
      });

      alert("Karta kupljena 🎟️");
      setSelectedSector(null);
    } catch (err) {
      console.error(err);
      alert("Greška prilikom kupovine karte!");
    }
  };

  return (
    <div className="tickets-page">
      {game && (
        <div className="game-header">
          <div className="teams">
            <div className="team">
              <img src={getImageUrl(game.homeTeamLogoUrl)} alt={game.homeTeamName} />
              <span>{game.homeTeamName}</span>
            </div>

            <div className="game-info">
              <div className="datetime">
                {game.kickOffFormatted}
              </div>
              <div className="stadium">{game.stadium}</div>
            </div>

            <div className="team">
              <img src={getImageUrl(game.awayTeamLogoUrl)} alt={game.awayTeamName} />
              <span>{game.awayTeamName}</span>
            </div>
          </div>
        </div>
      )}

      <h1 className="select-sector-title">IZABERITE SEKTOR</h1>

      <StadiumMap
        selectedSector={selectedSector?.code}
        onSelectSector={handleSelectSector}
        sectors={sectors}
      />

      {selectedSector && (
        <div className="sector-card">
          <div className="sector-card-header">
            <div>
              <h3>Sektor {selectedSector.code}</h3>
              <span className="sector-stand">
                Tribina: {tribina}
              </span>
            </div>

            <button
              className="close-sector"
              onClick={() => setSelectedSector(null)}
            >
              ✕
            </button>
          </div>

          <div className="sector-row">
            <span>Cijena</span>
            <b>{selectedSector.price} KM</b>
          </div>

          <div className="sector-row">
            <span>Slobodna mjesta</span>
            <b>{selectedSector.available}</b>
          </div>

          <div className="sector-row quantity-row">
            <span>Količina</span>

            <div className="quantity-control">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                −
              </button>

              <input
                type="number"
                value={quantity}
                min={1}
                max={selectedSector.available}
                onChange={(e) =>
                  setQuantity(
                    Math.min(
                      selectedSector.available,
                      Math.max(1, Number(e.target.value))
                    )
                  )
                }
              />

              <button
                onClick={() =>
                  setQuantity(q =>
                    Math.min(selectedSector.available, q + 1)
                  )
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="sector-total">
            Ukupno: <b>{quantity * selectedSector.price} KM</b>
          </div>

          <button
            className="buy-btn"
            disabled={quantity > selectedSector.available}
            onClick={buyTicket}
          >
            Kupi
          </button>
        </div>
      )}
    </div>
  );
};

export default Tickets;
