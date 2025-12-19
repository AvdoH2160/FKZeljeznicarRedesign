import React from 'react'
import { useEffect, useState } from "react"
import api from "../../services/api"

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        api.get('/profile/me')
            .then(res => setProfile(res.data))
            .catch(err => console.error("Error fetching profile:", err));
    }, []);

    if(!profile) { return <div>Loading...</div>; }

  return (
    <div>
      <h2>Profil</h2>
      <p>Username: {profile.userName}</p>
      <p>Email: {profile.email}</p>
    </div>
  )
}

export default Profile