import {React, useState, useEffect} from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import FirstTeam from './pages/FirstTeam/FirstTeam.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
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
            <Route path="/Prvi-Tim" element={<FirstTeam isHeaderExpanded={headerExpanded}></FirstTeam>}></Route>
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
