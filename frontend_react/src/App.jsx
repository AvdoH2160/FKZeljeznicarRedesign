import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Header from './components/Header/Header.jsx'
import "./app.css"

const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
