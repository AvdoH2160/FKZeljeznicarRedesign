import {React, useState, useEffect} from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import FirstTeam from './pages/FirstTeam/FirstTeam.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Player from './pages/Player/Player.jsx'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import ScrollManager from './components/ScrollManager/ScrollManager.jsx'
import NewsList from "./pages/NewsList/NewsList.jsx"
import News from "./pages/News/News.jsx"
import "./app.css"
import LoginRegister from "./pages/LoginRegister/LoginRegister.jsx"
import ProtectedRoute from "./components/Routes/ProtectedRoute.jsx"
import Profile from "./pages/Profile/Profile.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import PublicRoute from "./components/Routes/PublicRoute.jsx"
import RequireAuth from "./components/Routes/RequireAuth.jsx"
import AdminLayout from "./admin/AdminLayout.jsx"
import AdminDashboard from "./admin/pages/AdminDashboard.jsx"
import AdminGames from "./admin/pages/AdminGames.jsx"
import AdminNews from "./admin/pages/AdminNews.jsx"
import AdminPlayers from "./admin/pages/AdminPlayers.jsx"
import AdminUsers from "./admin/pages/AdminUsers.jsx"
import AdminLeagues from "./admin/pages/AdminLeagues.jsx"
import AdminTeams from "./admin/pages/AdminTeams.jsx"
import AdminMembership from "./admin/pages/AdminMembership.jsx"
import MembershipPage from "./pages/MembershipPage/MembershipPage.jsx"
import Stadium from "./pages/Stadium/Stadium.jsx"
import ClubInfo from "./pages/ClubInfo/ClubInfo.jsx"
import History from "./pages/History/History.jsx"


const App = () => {
  const [headerExpanded, setHeaderExpanded] = useState(false);
  const [backgroundHeader, setBackgroundHeader] = useState(false);

  const closeHeader = () => {
    setHeaderExpanded(false);
    setBackgroundHeader(false);
  }

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header isExpanded={headerExpanded} 
          setIsExpanded={setHeaderExpanded} 
          backgroundHeader={backgroundHeader}
          setBackgroundHeader={setBackgroundHeader}/>
          {headerExpanded && (
            <div className="page-overlay" onClick={closeHeader}></div>
          )}
            <ScrollManager/>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/prvi-tim" element={<FirstTeam></FirstTeam>}></Route>
              <Route path="/prvi-tim/:slug" element={<Player></Player>}></Route>
              <Route path="/novosti" element={<NewsList></NewsList>}></Route>
              <Route path="/novosti/:category" element={<NewsList></NewsList>}></Route>
              <Route path="/novost/:slug" element={<News></News>}></Route>
              <Route path="/stadion-grbavica" element={<Stadium></Stadium>}></Route>
              <Route path="/opste-informacije" element={<ClubInfo></ClubInfo>}></Route>
              <Route path="/historija" element={<History></History>}></Route>
              <Route path="/clanstvo" element={
                <ProtectedRoute>
                  <MembershipPage></MembershipPage>
                </ProtectedRoute>
              }></Route>
              <Route path="/clanstvo/:mode" element={
                <ProtectedRoute>
                  <MembershipPage></MembershipPage>
                </ProtectedRoute>
              }></Route>
              <Route path="/prijava" element={
                <PublicRoute>
                  <LoginRegister></LoginRegister>
                </PublicRoute>
              }></Route>
              <Route path="/profil" element={
                <ProtectedRoute>
                  <Profile></Profile>
                </ProtectedRoute>
              }></Route>
              <Route path="/admin" element={
                <RequireAuth role="Admin">
                  <AdminLayout></AdminLayout>
                </RequireAuth>
                }
              >
                <Route index element={<AdminDashboard></AdminDashboard>}></Route>
                <Route path="users" element={<AdminUsers></AdminUsers>}></Route>
                <Route path="news" element={<AdminNews></AdminNews>}></Route>
                <Route path="games" element={<AdminGames></AdminGames>}></Route>
                <Route path="players" element={<AdminPlayers></AdminPlayers>}></Route>
                <Route path="leagues" element={<AdminLeagues></AdminLeagues>}></Route>
                <Route path="teams" element={<AdminTeams></AdminTeams>}></Route>
                <Route path="memberships" element={<AdminMembership></AdminMembership>}></Route>
              </Route>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
