import { useState } from 'react'
import Narvbar from './components/Navbar/Nav.jsx';
import Home from './components/Home/home.jsx'
import HowItWorks from "./components/How It works/Works.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Narvbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Work" element={<HowItWorks />} />
      </Routes>
    </Router>
  )
}

export default App;
