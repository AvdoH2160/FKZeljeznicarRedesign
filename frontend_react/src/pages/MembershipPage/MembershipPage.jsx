import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Zeljo from "../../assets/svg/zeljo_color_icon.svg";
import "./membershipPage.css";

const MembershipPage = () => {
    const {mode: routeMode} = useParams();
    const navigate = useNavigate();
    const[mode, setMode] = useState(null);

    const mapMode = (m) => {
        switch (m) {
        case "uclani-se":
            return "new";
        case "obnova":
            return "renew";
        case "provjeri":
            return "check";
        default:
            return "new";
        }
    };

    const handleTabClick = (tab) => {
        switch (tab) {
        case "new":
            navigate("/clanstvo/uclani-se");
            break;
        case "renew":
            navigate("/clanstvo/obnova");
            break;
        case "check":
            navigate("/clanstvo/provjeri");
            break;
        default:
            navigate("/clanstvo/uclani-se");
        }
    };

    useEffect(() => {
        setMode(mapMode(routeMode));
    }, [routeMode]);


    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        email: "",
        phone: "",
        membershipNumber: "",
        year: 2026
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        if (mode === "new") {
            await api.post("/membership/apply", { ...form, type: "New" });
            alert("Prijava za učlanjenje poslana.");
        } else if (mode === "renew") {
            await api.post("/membership/renew", {
            firstName: form.firstName,
            lastName: form.lastName,
            membershipNumber: form.membershipNumber,
            year: form.year
            });
            alert("Zahtjev za obnovu poslan.");
        } else if (mode === "check") {
            const res = await api.get(`/membership/check/${form.membershipNumber}`);
            alert(`${res.data.firstName} ${res.data.lastName} – ${res.data.year}`);
        }
        } catch (err) {
        console.error(err);
        alert("Greška pri slanju zahtjeva");
        }
    };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-image">
          <img src={Zeljo} alt="Zeljo" />
          <p>ZA ŽIVOT <span>CIJELI</span></p>
        </div>

        <div className="membership-text">
          <p>
            Biti član FK Željezničar pitanje je opredjeljenja, identiteta,
            stava i emocije.
          </p>
          <p className="quote">
            “Željo je religija i život. Nije to samo fudbal, već stil
            življenja i ponašanja...”
          </p>
          <p>
            Kroz našu historiju, navijači su uvijek bili pokretačka snaga
            Kluba. Kupovinom članske kartice direktno pomažete rad našeg
            Kluba.
          </p>
        </div>

        <div className="auth-tabs">
        <button
            className={mode === "new" ? "active" : ""}
            onClick={() => handleTabClick("new")}
        >
            UČLANI SE
        </button>
        <button
            className={mode === "renew" ? "active" : ""}
            onClick={() => handleTabClick("renew")}
        >
            OBNOVA
        </button>
        <button
            className={mode === "check" ? "active" : ""}
            onClick={() => handleTabClick("check")}
        >
            PROVJERA
        </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
            {mode !== "check" && (
                <>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Ime *"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Prezime *"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                />
                </>
            )}
            {mode === "new" && (
                <>
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Spol *</option>
                    <option value="Male">Muško</option>
                    <option value="Female">Žensko</option>
                </select>

                <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Adresa stanovanja *"
                    value={form.address}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="city"
                    placeholder="Grad *"
                    value={form.city}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="postalCode"
                    placeholder="Poštanski broj *"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                />

                <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    required
                >
                    <option value="">Država *</option>
                    <option value="Bosnia">Bosna i Hercegovina</option>
                    <option value="Other">Druga</option>
                </select>

                <input
                    type="email"
                    name="email"
                    placeholder="E-mail adresa *"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Telefon *"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                </>
            )}

            {(mode === "renew" || mode === "check") && (
                <input
                type="text"
                name="membershipNumber"
                placeholder="Broj članske kartice *"
                value={form.membershipNumber}
                onChange={handleChange}
                required
                />
            )}

            <button type="submit">
                {mode === "new" && "POŠALJI PRIJAVU"}
                {mode === "renew" && "OBNOVI ČLANSTVO"}
                {mode === "check" && "PROVJERI KARTICU"}
            </button>
        </form>

      </div>
    </div>
  );
};

export default MembershipPage;
