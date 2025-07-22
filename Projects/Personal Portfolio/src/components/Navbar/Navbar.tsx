import React, { useState } from "react";
import { Menu, X } from 'lucide-react'; // if installed
import { href, Link } from "react-router-dom"
import Profile from '../Images/Profile.JPG'

function Navbar() {
  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // Navigation links
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/About" },
    { label: "Project", href: "/Project" },
    { label: "Contact", href: "/Contact" },
    { label: "Skills", href: "/Skills" }


  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-800 via-purple-800 to-indigo-800 text-white shadow-md">
      <div className="flex items-center justify-between h-[80px] px-6">
        {/* Logo */}
        <div className="">
          <img src={Profile} alt="ProfilePic" className="size-16 object-cover rounded-full"></img>
        </div>

        {/* Desktop nav links - hidden on small screens */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="bg-white/8 backdrop-blur-md text-center shadow-md text-white p-3 md:w-auto rounded-lg hover:bg-purple-800"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger toggle - shown only on small screens */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile nav menu - shown when isOpen is true */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 pb-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="inline-flex items-center justify-center bg-purple-800 w-[130px] h-[45px] text-white text-lg hover:bg-purple-700 transition rounded-2xl"
            >
              {item.label}
            </Link>
          ))}

        </div>
      )}
    </nav>
  );
}

export default Navbar;
