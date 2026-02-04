import React from "react";
import "./clubInfo.css";

const ClubInfo = () => {
  document.title = "O nama - FK Željezničar"
  return (
    <div className="club-info-page">

      <header className="club-info-header">
        <h1>FK Željezničar</h1>
        <p>Osnovan 1921. godine</p>
      </header>

      <section className="club-info-section">
        <h2>Opšte informacije</h2>

        <div className="info-grid">
          <div><strong>Godina osnivanja:</strong> 1921.</div>
          <div><strong>Adresa:</strong> Bulevar Ivice Osima 27, Sarajevo</div>
          <div><strong>Stadion:</strong> Grbavica</div>
          <div><strong>Nadimak:</strong> Željo, Plavi</div>
          <div><strong>Boje:</strong> Plava, bijela</div>
        </div>
      </section>

      <section className="club-info-section">
        <h2>Uprava kluba</h2>

        <ul className="info-list">
          <li><strong>Počasni predsjednik:</strong> Ivan Ivica Osim</li>
          <li><strong>Strateški partner:</strong> Sanin Mirvić</li>
          <li><strong>Predsjednik Skupštine:</strong> Sanin Mirvić</li>
          <li><strong>Predsjednik Nadzornog odbora:</strong> Almir Gredić</li>
          <li><strong>Predsjednik Upravnog odbora:</strong> Nijaz Brković</li>
          <li><strong>Direktor:</strong> Amira Uzunović</li>
          <li><strong>V.d. Direktor:</strong> Jusuf Tanović</li>
          <li><strong>Generalni sekretar:</strong> Lejla Dautbašić</li>
          <li><strong>Šef stručnog štaba:</strong> Slaviša Stojanović</li>
        </ul>
      </section>

      <section className="club-info-section">
        <h2>Uspjesi</h2>

        <ul className="trophies">
          <li>🏆 Prvenstvo NR BiH (1946)</li>
          <li>🏆 Prvenstvo Jugoslavije (1971/1972)</li>
          <li>🏆 Prvenstvo BiH (6): 1997/98, 2000/01, 2001/02, 2009/10, 2011/12, 2012/13</li>
          <li>🏆 Kup BiH (6): 1999/00, 2000/01, 2002/03, 2010/11, 2011/12, 2017/18</li>
          <li>🏆 Super kup BiH (3): 1998, 2000, 2001</li>
        </ul>
      </section>

      <section className="club-info-section">
        <h2>Međunarodni uspjesi</h2>

        <ul className="info-list">
          <li><strong>Kup UEFA:</strong> četvrtfinale 1971/72, polufinale 1984/85</li>
        </ul>
      </section>

      <section className="club-info-section">
        <h2>Lokacija stadiona Grbavica</h2>

        <div className="map-container">
            <iframe
            title="Stadion Grbavica"
            src="https://www.google.com/maps?q=Stadion%20Grbavica%20Sarajevo&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </section>


    </div>
  );
};

export default ClubInfo;
