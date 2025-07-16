import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Nav.jsx';
import Home from './components/Home/home.jsx'
import HowItWorks from "./components/How It works/Works.jsx"
import Services from "./components/Services/Services.jsx"
import Providers from "./components/Providers/Providers.jsx"
import ProvidersForm from "./components/Providers/ProvidersForm.jsx"


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Work" element={<HowItWorks />} />
        <Route path="/Services" element={<Services />}/> 
        <Route path="/Providers" element={<Providers />}/>
        <Route path="/ProvidersForm" element={<ProvidersForm />}/>
      </Routes>
    </Router>
  )
}

export default App;
