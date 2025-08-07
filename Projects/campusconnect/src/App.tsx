import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Nav.jsx';
import Home from './components/Home/home.jsx'
import HowItWorks from "./components/How It works/Works.jsx"
import Services from "./components/Services/Services.jsx"
import ProvidersData from "./components/Providers/ProviderData.js"
import ProvidersForm from "./components/Providers/ProvidersForm.jsx"
import ProvidersProfile from "./components/Providers/ProvidersProfile.js"; 
import LoginSignUp from "./components/Login/LoginSignUp.jsx"; 



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
        <Route path='/Provider/:id' element={<ProvidersProfile />} /> {/**adding :id extracts id from provider's profile */}
        <Route path='/LoginSignUp' element={<LoginSignUp />} />
      </Routes>
    </Router>
  )
}

export default App;
