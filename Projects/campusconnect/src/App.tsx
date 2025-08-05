import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Nav.jsx';
import Home from './components/Home/home.jsx'
import HowItWorks from "./components/How It works/Works.jsx"
import Services from "./components/Services/Services.jsx"
import ProvidersData from "./components/Providers/ProviderData.js"
import ProvidersForm from "./components/Providers/ProvidersForm.jsx"
import ProvidersPage from "./components/Providers/ProvidersPage.tsx"; 



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Work" element={<HowItWorks />} />
        <Route path="/Services" element={<Services />}/> 
        <Route path="/Providers" element={<ProvidersData />}/>
        <Route path="/ProvidersForm" element={<ProvidersForm />}/>
        <Route path='/Provider/:id' element={<ProvidersPage />} /> {/**adding :id extracts id from provider's profile */}
      </Routes>
    </Router>
  )
}

export default App;
