import React from 'react'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import EditIcon from "../../assets/svg/edit.svg"
import ZeljoIcon from "../../assets/svg/zeljo_white_icon.svg"
import Stadium from "../../assets/svg/stadium.svg"
import "./profile.css"

const formatDate = (date) => {
  if(!date) return "";
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({});
    const [flipped, setFlipped] = useState(false);

    const toggleFlip = () => {
      setFlipped(prev => !prev);
    }

    useEffect(() => {
        api.get('/profile/me')
            .then(res => setProfile(res.data))
            .catch(err => console.error("Error fetching profile:", err));
    }, []);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

     const handleSave = () => {
      api.put("/profile/me", form)
        .then(res => {
          setProfile(res.data);
          setIsEditing(false);
        })
        .catch(err => console.error(err));
    };

    if(!profile) { return <div>Loading...</div>; }

  return (
    <div className='profile-container'>
      <div className='profile-information-container'>
        <div className='profile-information-text'>
          <p className='welcome-text'>DOBRODOŠAO, {profile.userName}</p>
          <p className='user-small'>Ime i prezime:</p>
           {isEditing ? (
            <>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </>
          ) : (
            <p className="user-big">
              {profile.firstName} {profile.lastName}
            </p>
          )}
          <p className='user-small'>Grad:</p>
          {isEditing ? (
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          ) : (
            <p className="user-big">{profile.city}</p>
          )}
          <p className='user-small'>E-mail:</p>
          {isEditing ? (
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          ) : (
            <p className="user-big">{profile.email}</p>
          )}
          <p className='user-small'>Datum rođenja:</p>
          {isEditing ? (
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth?.split("T")[0]}
              onChange={handleChange}
            />
          ) : (
            <p className="user-big">{formatDate(profile.dateOfBirth)}</p>
          )}
          <div className="profile-buttons">
            {isEditing ? (
              <>
                <button className="btn primary" onClick={handleSave}>
                  Sačuvaj
                </button>
                <button className="btn secondary" onClick={() => {
                  setForm(profile);
                  setIsEditing(false);
                }}>
                  PONIŠTI
                </button>
              </>
            ) : (
              <>
                <button className="btn primary" onClick={() => {
                  setForm(profile);
                  setIsEditing(true);
                }}>
                  PROFIL <img src={EditIcon} alt="edit icon" className="edit-icon"/>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="profile-information-membership">
          <div 
            className={`membership-flip ${flipped ? "flipped" : ""}`} 
            onClick={profile.membership ? toggleFlip : undefined}
          >
            <div className="membership-flip-inner">
              <div className="membership-front profile-information-membershipCard">
                <div className="profile-information-membershipCard-header">
                  <p>MI SMO ŽELJINI</p>
                  <img src={ZeljoIcon} />
                  <p>ŽELJO JE NAS</p>
                </div>
                <div className='profile-information-membershipCard-main'>
                  <div className='profile-information-membershipCard-main-text'>
                    <p>ČLANSKA KARTA</p>
                    {profile.membership ? (
                      <p className='main-text'>
                        {profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}
                      </p>
                    ) : (
                      <Link to="/clanstvo/uclani-se">
                        <p className='main-text member'>UČLANI SE</p>
                      </Link>
                    )}
                  </div>
                  <img src={Stadium} />
                </div>
                {profile.membership ? (
                  <div className='profile-information-membershipCard-footer'>
                    <p>{profile.membership.membershipNumber}</p>
                    <p className='year'>{profile.membership.year}</p>
                  </div>
                ) : (
                  <p className='dots'>----------------</p>
                )}
              </div>
              <div className="membership-back profile-information-membershipCard">
                <p className="qr-title">SKENIRAJ ZA PROVJERU</p>

                {profile.membership && (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${profile.membership.codeValue}`}
                    alt="QR Code"
                    className="qr-image"
                  />
                )}

                {/* <p className="qr-code-text">
                  {profile.membership?.codeValue}
                </p> */}
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="profile-tickets">

      </div>
    </div>
  )
}

export default Profile