import React from 'react'
import "./membershipCard.css"
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
            <p>
                POSTANI ČLAN
            </p>
        </div>
    </div>
  )
}

export default MembershipCard