import React from 'react'
import { Link } from 'react-router-dom'
import "./membershipCard.css"
import Arrow from "../../assets/svg/arrow_right.svg"
import MembershipCardImage from "../../assets/images/clanska_karta.png"

const MembershipCard = () => {
  return (
    <div id="membershipCard-container">
        <img src={MembershipCardImage}></img>
        <div id="membershipCardText-container">
            <p>
                BROJ ČLANOVA
            </p>
            <p className='small'>
                Ažurira se dnevno
            </p>
            <p className='big'>
                4500
            </p>
            <Link to="/clanstvo/uclani-se" className='smembershipCard-link'>
                <p>POSTANI ČLAN</p><img src={Arrow}></img><img src={Arrow}></img>
            </Link>
        </div>
    </div>
  )
}

export default MembershipCard