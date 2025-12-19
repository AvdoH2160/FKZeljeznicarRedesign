import React from 'react'
import {useState, useRef, useEffect, useContext} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Zeljo from '../../assets/svg/zeljo_color_icon.svg'
import "./loginRegister.css"

const LoginRegister = () => {
    const [mode, setMode] = useState('login'); // 'login' or 'register'

    const { login, register } = useContext(AuthContext);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        birthdate: "",   // YYYY-MM-DD
        city: ""
    });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(mode === 'login') {
            console.log('LOGIN:', form);
            await login({
                userName: form.username,
                password: form.password
            });
            navigate("/profil");
        } else {
            console.log('REGISTER:', form);
            await register({
                email: form.email,
                userName: form.username,
                password: form.password,
                firstName: form.firstname,  // mora postojati u form state
                lastName: form.lastname,
                dateOfBirth: form.birthdate, // npr. "2000-01-01"
                city: form.city || ""         // optional, ali mora postojati
            });
            navigate("/prijava");
        }
    }    

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className='auth-image'>
            <img src={Zeljo} alt="Zeljo Icon"></img>
            <p>ZA ŽIVOT <span>CIJELI</span></p>
        </div>
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            PRIJAVA
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            REGISTRACIJA
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">

          {mode === "register" && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {mode === "register" && (
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          )}
          {mode === "register" && (
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={form.lastname}
              onChange={handleChange}
              required
            />
          )}
          {mode === "register" && (
            <input
              type="date"
              name="birthdate"
              placeholder="Birth Date"
              value={form.birthdate}
              onChange={handleChange}
              required
            />
          )}
          {mode === "register" && (
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />
          )}

          <button type="submit">
            {mode === "login" ? "PRIJAVA" : "REGISTRACIJA"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default LoginRegister