import React from 'react'
import {useState, useRef, useEffect} from 'react'
import {Link} from "react-router-dom"
import "./stadiumSection.css"
import Stadium from "../../assets/images/image18.png"
import Arrow from "../../assets/svg/arrow_right.svg"

const stadiumSection = () => {
  return (
    <div id="stadium-section-container">
        <div id="stadium-image-text-container">
            <img id="stadium-image"src={Stadium}></img>
            <div id="stadium-text-container">
                <h1>STADION GRBAVICA</h1><br/>
                <p className="stadium-text">
                    Od samog osnivanja 1921. godine Željezničar je uvijek kuburio sa problemom vlastitog igrališta. Nakon vojnog vježbališta Egzercir na Čengić Vili, te prvog igrališta na Pofalićima, sa kojeg su i protjerani 1938. godine, jer su postali ozbiljna konkurencija moćnijim sarajevskim klubovima, Željezničari su odlučili da sagrade vlastiti fudbalski hram, na kojem će se igrati svoje utakmice.
                    <br/><br/>
                    Ime stadiona: Grbavica<br/>
                    Nadimak: Dolina ćupova<br/>
                    Kapacitet: 13.057<br/>
                    Izgrađen: 13. septembar 1953. godine<br/>
                </p><br/>
                <Link to="/stadion-grbavica" className='stadium-text-link'>
                  <div className='stadium-text-button'>
                    <p>PROČITAJ VIŠE</p>
                    <img src={Arrow}></img>
                    <img src={Arrow}></img>
                  </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default stadiumSection