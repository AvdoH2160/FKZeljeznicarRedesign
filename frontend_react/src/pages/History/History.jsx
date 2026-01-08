import React from "react";
import "./history.css";

const History = () => {
  return (
    <div className="history-page">

      {/* HERO */}
      <section className="history-hero">
        <h1>Historija FK Željezničar</h1>
        <p>
          Više od jednog kluba. Više od fudbala.  
          FK Željezničar – priča koja traje od 1921. godine.
        </p>
      </section>

      {/* OSNIVANJE */}
      <section className="history-section">
        <h2>Osnivanje i prvi koraci (1921–1945)</h2>
        <p>
          Fudbalski klub Željezničar osnovan je 19. septembra 1921. godine
          od strane radnika željeznice. Klub je od samog početka nosio
          radnički duh, prkos i inat, što će postati njegov zaštitni znak
          kroz historiju.
        </p>
        <p>
          Uprkos teškim uslovima i čestim promjenama igrališta, Željezničar
          se brzo afirmisao kao ozbiljan fudbalski kolektiv u tadašnjoj
          Jugoslaviji.
        </p>
      </section>

      {/* ZLATNE GODINE */}
      <section className="history-section alt">
        <h2>Zlatne godine i evropski uspjesi (1960–1985)</h2>
        <p>
          Najveći domaći uspjeh klub je ostvario u sezoni 1971/1972,
          kada je Željezničar postao šampion Jugoslavije. Generacija
          predvođena Ivicom Osimom ispisala je zlatna slova historije.
        </p>
        <p>
          Evropska bajka nastavljena je 1985. godine, kada je Željezničar
          stigao do polufinala Kupa UEFA, što je i danas jedan od najvećih
          uspjeha bh. fudbala u Evropi.
        </p>
      </section>

      {/* RAT I OBNOVA */}
      <section className="history-section">
        <h2>Rat, razaranje i povratak (1992–2000)</h2>
        <p>
          Tokom agresije na Bosnu i Hercegovinu, stadion Grbavica
          bio je na prvoj liniji fronta i gotovo u potpunosti uništen.
          Klub je, zajedno sa svojim navijačima, preživio najteže dane.
        </p>
        <p>
          Povratkom na Grbavicu, Željezničar se vratio jači nego ikad,
          osvajajući titule i kupove u nezavisnoj Bosni i Hercegovini.
        </p>
      </section>

      {/* MODERNA ERA */}
      <section className="history-section alt">
        <h2>Moderna era (2000 – danas)</h2>
        <p>
          Željezničar je postao najtrofejniji klub u Bosni i Hercegovini,
          sa brojnim titulama prvenstva i Kupa. Klub je ostao simbol
          kontinuiteta, identiteta i vjernosti navijača.
        </p>
        <p>
          Grbavica danas ponovo živi, a Željo nastavlja svoju borbu –
          uvijek zajedno sa svojim navijačima.
        </p>
      </section>

      {/* CITAT */}
      <section className="history-quote">
        <p>
          “Željezničar nije klub koji se voli –  
          Željezničar je klub koji se živi.”
        </p>
      </section>

    </div>
  );
};

export default History;
