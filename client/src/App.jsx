import { useState } from 'react'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import BettingUI from './pages/BettingUI.jsx'
import CreateJoinRoom from './pages/CreateJoinRoom.jsx'
import PlayGame from './pages/PlayGame.jsx'
import AboutUs from './components/AboutUs.jsx'
import Contact from './components/Contact.jsx'
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import Terms from './components/Terms.jsx'
import Safety from './components/Safety.jsx'



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cr" element={<CreateJoinRoom />} />
        <Route path="/play/:roomId" element={<PlayGame />} />
        <Route path="/betting/:roomId" element={<BettingUI/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/terms-of-service" element={<Terms/>}/>
        <Route path="/safety-guidelines" element={<Safety/>}/>
        

        
      </Routes>

    </>
  )
}

export default App
