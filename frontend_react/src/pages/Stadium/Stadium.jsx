import React  from 'react'
import {useRef, useState} from "react"
import "./stadium.css"
import StadiumVideo from "../../assets/images/zeljo-stadion-video.mp4"

const Stadium = () => {
    const videoRef = useRef(null);
    const [muted, setMuted] = useState(true);
    document.title = "Stadion Grbavica - FK Željezničar"

    const toggleSound = () => {
        const video = videoRef.current;
        video.muted = !video.muted;
        setMuted(video.muted);
    };
  return (
    <div className="stadium-page">
      <div className="stadium-video">
        <video
            ref={videoRef}
            src={StadiumVideo}
            autoPlay
            muted
            loop
            playsInline
        />
        <div className="stadium-video-overlay">
          <h1>STADION GRBAVICA</h1>
          <p>Dolina Ćupova</p>
        </div>
        <button className="sound-btn" onClick={toggleSound}>
            {muted ? "🔊 Uključi zvuk" : "🔇 Isključi zvuk"}
        </button>
      </div>
      <div className="stadium-text">
        <p className="intro">
          Od samog osnivanja 1921. godine Željezničar je uvijek kuburio sa problemom
          vlastitog igrališta. Nakon vojnog vježbališta Egzercir na Čengić Vili, te
          prvog igrališta na Pofalićima, Željezničari su odlučili da sagrade vlastiti
          fudbalski hram.
        </p>

        <p>
          Odlučni članovi Radničkog Sportskog Društva Željezničar su 1949. godine pokrenuli radnu akciju, gradnju današnjeg stadiona Grbavica, koja je završena 13. septembra 1953. godine. U prvoj zaničnoj utakmici, prilikom otvaranja, Željezničar je savladao Šibenik sa 4:1.
        </p>

        <p>
          Tada se nije moglo ni slutiti da će dom našeg kluba, nekih četrdesetak godina kasnije, biti skoro poptuno uništen.
        </p>

        <p>
          Tokom agresije na Bosnu i Hercegovinu, stadion Grbavica ili popularno zvana “Dolina Ćupova” je postala prva borbena linija, a zapadna tribina, prenesena sa stadiona “6. april” sa Marijin Dvora prilikom same izgradnje stadiona, zapaljena je, dok je dio stadiona miniran. Sa tribinom zajedno je izgorilo i nestalo 316 pehara, od čega su 42 pripadala fudbalerima, a razliku u broju osvojili su ostali klubovi iz Sportskog Društva Željezničar, koje je tada brojalo 14 klubova. Ipak, neki pehari koji su bili u prostorijama kluba na Marijin Dvoru su sačuvani i danas krase vitrine “plavog salona”.
        </p>

        <p>
          Prvo veće renoviranje stadion je doživio 30. juna 1968. prilikom čega je bio zatvoren za utakmice. Uklonjena je “atletska staza” koja je postavljena tokom prvobitne izgradnje 1949. godine. Renoviranje je trajalo skoro cijelih osam godina i završeno je 25. aprila 1976. godine kada se Željo i zvanično “vratio kući”.
        </p>

        <p>
          Stadion Grbavica je renoviranja doživio 2017. godine. Izgrađena je nova istočna tribina, a najveći dio troškova izgradnje platili su navijači FK Željezničar kroz projekat desetogodišnjih ulaznica. U narednoj, 2018. godini promijenjen je teren naše Grbavice. Postavljen je travnjak sa hibridom, sistem navodnjavanja, grijači. Početkom 2019. godine istočna tribina je natrkrivena.
        </p>

        <p>
          Rušen je i paljen s ciljem da se uništi sve ono što je s ljubavlju građeno još od 1921. godine. Gledali smo “ljepoticu” sa borbenih linija i maštali o prvom narednom derbiju, o semaforu, stolicama, reflektorima, prvoj noćnoj utakmici u “Dolini Ćupova”, evropskim utakmicama i znali smo da ćemo jednog dana doći na svoje, na naše.
        </p>

        <div className="stadium-facts">
          <p><strong>Ime stadiona:</strong> Grbavica</p>
          <p><strong>Nadimak:</strong> Dolina Ćupova</p>
          <p><strong>Kapacitet:</strong> 13.057</p>
          <p><strong>Izgrađen:</strong> 13. septembar 1953.</p>
        </div>
      </div>
    </div>
  );
};

export default Stadium;