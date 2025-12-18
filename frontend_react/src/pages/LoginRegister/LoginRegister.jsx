import React from 'react'
import {useState, useRef, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import Zeljo from '../../assets/svg/zeljo_color_icon.svg'
import "./loginRegister.css"

const LoginRegister = () => {
    const [mode, setMode] = useState('login'); // 'login' or 'register'

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if(mode === 'login') {
            console.log('LOGIN:', form);
        } else {
            console.log('REGISTER:', form);
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

          <button type="submit">
            {mode === "login" ? "PRIJAVA" : "REGISTRACIJA"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default LoginRegister