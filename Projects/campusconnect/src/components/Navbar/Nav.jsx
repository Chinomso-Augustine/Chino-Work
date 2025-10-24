import React, { useState, useEffect } from "react";
import { Flag, Menu, X } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient"; // adjust path
import { useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Getting current user on mount + listen for changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/"); // redirect home
  };

  {/*Important func: 
    Initial state is false. 
    Get route info which is location from router and start tracking the location. 
    use useEffect to watch changes in location.pathname. 
    Whenever location.pathname changes, we call setIsOpen and set it to be false which closes the menue. */}
  const location = useLocation(); 
  useEffect(() =>{
    setIsOpen(false); 
  }, [location.pathname]); 
  
  const navItems = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/work" },
    { label: "View Services", href: "/Services" },
    { label: "View Providers", href: "/Providers" },
    { label: "Become A Provider", href: "/ProvidersForm" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-white shadow-md">
      <div className="flex items-center justify-between h-[80px] px-6">
        {/* Logo */}
        <div className="text-3xl font-bold">CampusConnect</div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="bg-white/8 backdrop-blur-md text-center shadow-md text-white p-3 rounded-lg hover:bg-purple-800"
            >
              {item.label}
            </Link>
          ))}

          {/* Conditional Sign In / Sign Out */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-red-400 p-3 rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/LoginSignUp"
              className="bg-white/8 backdrop-blur-md text-center shadow-md text-white p-3 rounded-lg hover:bg-purple-800"
            >
              Log In
            </Link>
          )}
        </div>

        {/* Hamburger toggle - mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>


      {/* Mobile nav */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 pb-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="inline-flex items-center justify-center bg-purple-800 w-[130px] h-[45px] text-white text-sm hover:bg-purple-700 transition rounded-2xl"
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={handleSignOut}
              
              className="inline-flex items-center justify-center bg-red-600 w-[130px] h-[45px] text-white text-lg hover:bg-red-700 transition rounded-2xl"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/LoginSignUp"
              className="inline-flex items-center justify-center bg-purple-800 w-[130px] h-[45px] text-white text-lg hover:bg-purple-700 transition rounded-2xl"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
