import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Zeljo from "../../assets/svg/zeljo_color_icon.svg";
import "./loginRegister.css";

const LoginRegister = () => {
    const { addToast } = useToast();
    const [mode, setMode] = useState('login'); // 'login' or 'register'

    const { login, register, isAuthenticated } = useContext(AuthContext);

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

    document.title="Prijava - FK Željezničar"

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(mode === 'login') {
          try {
            await login({
              userName: form.username,
              password: form.password
            });
            addToast("Uspješna prijava", "success");
            setTimeout(() => {
              navigate("/profil");
            }, 1000);
          } catch(err) {
            addToast("Prijava nije uspješna", "error");
          }
        } else {
          try {
            await register({
              email: form.email,
              userName: form.username,
              password: form.password,
              firstName: form.firstname,  // mora postojati u form state
              lastName: form.lastname,
              dateOfBirth: form.birthdate, // npr. "2000-01-01"
              city: form.city || ""         // optional, ali mora postojati
            });
            addToast("Uspješna registracija", "success");
            setTimeout(() => {
              navigate("/prijava");
            }, 1000);
          } catch(err) {
            addToast("Registracija nije uspješna", "error");
          }
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