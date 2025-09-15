import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home/Home";
import Navbar from "./components/Home/Navbar";
import About from "./components/Aboutme/About";
import ContactForm from "./components/Home/ContactForm";

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
