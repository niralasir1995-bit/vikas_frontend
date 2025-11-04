import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Detect login state
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("studentToken");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    if (onLogout) onLogout();
    localStorage.clear();
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Notifications", path: "/notifications" },
    { name: "Our Services", path: "/services" },
    { name: "Study Material", path: "/study-materials" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-indigo-700 to-blue-600 shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
      <div className="max-w-9xl mx-auto flex items-center justify-between px-8 md:px-14 py-8 relative z-20">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-full border border-white/40" />
          <span className="text-white font-bold text-lg md:text-xl tracking-wide">
            VIKASH EDUCATION HUB
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-white font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-3 py-1.5 rounded-md transition ${
                location.pathname === item.path
                  ? "bg-white text-indigo-700 font-semibold shadow-sm"
                  : "hover:bg-white/20"
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* ✅ Conditional Login / Logout Button */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-semibold px-4 py-1.5 rounded-full hover:bg-red-600 transition shadow-sm"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-white text-indigo-700 font-semibold px-4 py-1.5 rounded-full hover:bg-yellow-200 transition shadow-sm"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-white/20 text-white p-2 rounded-md hover:bg-white/30 transition"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-white rounded-b-2xl shadow-2xl z-40 animate-slideIn border-t border-indigo-300">
          <ul className="flex flex-col px-6 py-5 space-y-3 font-semibold">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-lg py-2 text-center transition shadow-md ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-indigo-700 to-blue-700 text-white"
                      : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-blue-700 hover:to-indigo-700"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            <li>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full bg-red-500 text-white border border-red-600 rounded-lg py-2 text-center hover:bg-red-600 transition shadow-md"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-white text-indigo-700 border border-indigo-600 rounded-lg py-2 text-center hover:bg-gray-100 transition shadow-md"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}