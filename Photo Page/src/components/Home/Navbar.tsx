import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contactform" },
  ];

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-purple-800 via-purple-800 to-indigo-800 text-white shadow-md">

      <div className="flex justify-end border border-amber-400">

        {/**X and menu divs */}
        <div className=" border border-red-900 flex items-center justify-end h-auto p-3">
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center justify-center text-center space-x-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="border border-white bg-white/8 backdrop-blur-md text-center shadow-md text-white p-3 md:w-auto rounded-lg hover:bg-purple-800 sm:border-red-300 flex justify-end"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Hamburger toggle */}
          <div className="lg:hidden border border-amber-50">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile menu display */}
        {isOpen && (
          <div className="md:hidden fixed top-2 left-70 flex flex-row items-center gap-2 justify-center text-center h-auto ">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="border border-red-300 bg-white/8 backdrop-blur-md text-center shadow-md text-white p-3 md:w-auto rounded-lg hover:bg-purple-800"
              >
                {item.label}
              </Link>
            ))}
          </div>

        )}
      </div>
    </nav>
  );
}

export default Navbar;
