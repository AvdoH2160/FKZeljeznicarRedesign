import React from 'react'
import { useEffect, useState } from "react"
import api from "../../services/api"
import EditIcon from "../../assets/svg/edit.svg"
import "./profile.css"

const formatDate = (date) => {
  if(!date) return "";
  const d = new Date(date);
  return `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;
}

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({});

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
                <button className="btn secondary">Učlani se</button>
              </>
            )}
          </div>
        </div>
        <div className='profile-information-membership'>
          <div className="profile-information-membershipCard">

          </div>
        </div>
      </div>
      <div className="profile-tickets">

      </div>
    </div>
  )
}

export default Profile