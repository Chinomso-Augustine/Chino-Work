import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Nav";
import Home from "./components/Home/HomePage";
import Services from "./components/Services/Services";
import ProvidersData from "./components/Providers/ProviderData";
import ProvidersForm from "./components/Providers/ProvidersForm";
import ProvidersProfile from "./components/Providers/ProvidersProfile";
import LoginSignUp from "./components/Login/LoginSignUp";
import ResetPassword from "./components/Login/ResetPassword";
import BookingPage from "./components/Booking/BookingPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Services" element={<Services />}/> 
        <Route path="/Providers" element={<ProvidersData />}/>
        <Route path="/ProvidersForm" element={<ProvidersForm />}/>
        <Route path='/Provider/:id' element={<ProvidersProfile />} /> {/**adding :id extracts id from provider's profile */}
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path='/LoginSignUp' element={<LoginSignUp />} />
        <Route path='/auth/reset' element={<ResetPassword />} />
      </Routes>
    </Router>
  )
}

export default App;
