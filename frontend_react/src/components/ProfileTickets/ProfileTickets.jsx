import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./profileTickets.css";

const ProfileTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const res = await api.get("/tickets/my");

        const resData = res.data;

        const formattedTickets = resData.map(t => {
          const date = new Date(t.matchDate);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          const hour = String(date.getHours()).padStart(2, "0");
          const minute = String(date.getMinutes()).padStart(2, "0");

          let tribina = "";
          if (t.sector.startsWith("A")) tribina = "Zapad";
          else if (t.sector.startsWith("B")) tribina = "Sjever";
          else if (t.sector.startsWith("C")) tribina = "Istok";
          else if (t.sector.startsWith("D")) tribina = "Jug";

          return {
            ...t,
            kickOffDateFormatted: `${day}.${month}.${year}`,
            kickOffTimeFormatted: `${hour}:${minute}`,
            kickOffFormatted: `${day}.${month}.${year} • ${hour}:${minute}`,
            tribina
          };
        });

        setTickets(formattedTickets);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };

    loadTickets();
  }, []);

  if (!tickets.length) return <p>Nemate kupljenih karata.</p>;

  return (
    <div className="tickets-list">
      {tickets.map(ticket => (
        <div className="ticket-card" key={ticket.ticketNumber}>
          <div className="ticket-header">
            <div className="game-name">
              {ticket.game.toUpperCase()}
            </div>
            <div className="ticket-datetime">
              {ticket.kickOffFormatted}
            </div>
          </div>

          <div className="ticket-info">
            <p><b>Tribina:</b> {ticket.tribina}</p>
            <p><b>Sektor:</b> {ticket.sector}</p>
          </div>

          <div className="ticket-qr">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.ticketNumber}`}
              alt="QR Code"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileTickets;