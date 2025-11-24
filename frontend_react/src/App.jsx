import {React, useState, useEffect} from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Header from './components/Header/Header.jsx'
import "./app.css"

const App = () => {
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const [backgroundHeader, setBackgroundHeader] = useState(false);

  const closeHeader = () => {
    setHeaderExpanded(false);
    setBackgroundHeader(false);
  }

  return (
    <div>
      <BrowserRouter>
      <Header isExpanded={headerExpanded} 
      setIsExpanded={setHeaderExpanded} 
      backgroundHeader={backgroundHeader}
      setBackgroundHeader={setBackgroundHeader}/>
      {headerExpanded && (
        <div className="page-overlay" onClick={closeHeader}></div>
      )}
      <Routes>
        <Route path="/" element={<Home isHeaderExpanded={headerExpanded}></Home>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
