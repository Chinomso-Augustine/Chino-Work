import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "View Services", href: "/Services" },
    { label: "View Providers", href: "/Providers" },
    { label: "Become A Provider", href: "/ProvidersForm" },
  ];

  const getInitials = (authUser: User | null) => {
    if (!authUser) return "";
    const fullName = authUser.user_metadata?.full_name?.trim();
    if (fullName) {
      const parts = fullName.split(/\s+/).filter(Boolean);
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      const first = parts[0].charAt(0);
      const last = parts[parts.length - 1].charAt(0);
      return `${first}${last}`.toUpperCase();
    }
    const email = authUser.email || "";
    return email ? email.charAt(0).toUpperCase() : "";
  };

  return (
    <nav className="app-topbar fixed top-0 left-0 w-full z-50 text-slate-900">
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="text-[1.7rem] font-semibold tracking-tight text-slate-900 transition hover:text-blue-600"
        >
          Campus<span className="text-blue-600">Connect</span>
        </Link>

        <div className="hidden md:flex items-center space-x-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <>
              <div
                title={user.user_metadata?.full_name || user.email || "Logged in"}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-xs font-semibold text-blue-700"
              >
                {getInitials(user)}
              </div>
              <button
                onClick={handleSignOut}
                className="app-btn-secondary px-4 py-2"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/LoginSignUp"
              className="app-btn-primary px-5 py-2.5"
            >
              Log In
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-700"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mx-4 mb-4 rounded-[28px] border border-blue-100 bg-white/95 p-4 shadow-lg md:hidden sm:mx-6">
          {user && (
            <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-semibold text-blue-700">
              {getInitials(user)}
            </div>
          )}
          <div className="flex flex-col gap-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <button
                onClick={handleSignOut}
                className="app-btn-secondary w-full"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/LoginSignUp"
                className="app-btn-primary w-full"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
