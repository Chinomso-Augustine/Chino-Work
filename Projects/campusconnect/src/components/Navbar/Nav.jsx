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
    { label: "View Services", href: "/Services" },
    { label: "View Providers", href: "/Providers" },
    { label: "Become A Provider", href: "/ProvidersForm" },
  ];

  const getInitials = (authUser) => {
    if (!authUser) return "";
    const fullName = authUser?.user_metadata?.full_name?.trim();
    if (fullName) {
      const parts = fullName.split(/\s+/).filter(Boolean);
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      const first = parts[0].charAt(0);
      const last = parts[parts.length - 1].charAt(0);
      return `${first}${last}`.toUpperCase();
    }
    const email = authUser?.email || "";
    return email ? email.charAt(0).toUpperCase() : "";
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-purple-200/70 bg-white/90 text-slate-900 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between h-[78px] px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight text-purple-900 hover:text-purple-800"
        >
          CampusConnect
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="rounded-lg border border-purple-200/70 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-purple-300 hover:text-purple-900"
            >
              {item.label}
            </Link>
          ))}

          {/* Conditional Sign In / Sign Out */}
          {user ? (
            <>
              <div
                title={user?.user_metadata?.full_name || user?.email || "Logged in"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-purple-200/70 bg-white text-xs font-semibold text-purple-700"
              >
                {getInitials(user)}
              </div>
              <button
                onClick={handleSignOut}
                className="rounded-lg border border-purple-200/70 bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-800"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/LoginSignUp"
              className="rounded-lg border border-purple-200/70 bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-800"
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
        <div className="md:hidden flex flex-col items-center space-y-3 pb-4">
          {user && (
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-purple-200/70 bg-white text-sm font-semibold text-purple-700">
              {getInitials(user)}
            </div>
          )}
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="inline-flex items-center justify-center w-[160px] rounded-xl border border-purple-200/70 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-purple-300 hover:text-purple-900"
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <button
              onClick={handleSignOut}
              
              className="inline-flex items-center justify-center w-[160px] rounded-xl bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-800"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/LoginSignUp"
              className="inline-flex items-center justify-center w-[160px] rounded-xl bg-purple-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-800"
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
