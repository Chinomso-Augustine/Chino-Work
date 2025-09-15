import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/home.js"
import Navbar from './components/Home/navbar.js'
import About from './components/Aboutme/About.js'
import ContactForm from './components/Home/contactForm.js';

function App() {
  return (
    <Router>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element = {<About />} />
        <Route path='/ContactForm' element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
