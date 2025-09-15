import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home.js";
import Navbar from "./components/Home/Navbar.js";
import About from "./components/Aboutme/About.js";
import ContactForm from "./components/Home/ContactForm.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactform" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
