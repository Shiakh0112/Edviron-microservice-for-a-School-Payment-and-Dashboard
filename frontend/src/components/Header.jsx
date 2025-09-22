import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const getUsername = (email) => (email ? email.split("@")[0] : "");

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 py-4 ${
        theme === "dark" ? "bg-gray-900/90" : "bg-white/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className={`text-lg sm:text-2xl font-extrabold p-2 rounded-lg relative inline-block tracking-wide transition-all duration-300 transform group ${
              theme === "dark"
                ? "text-blue-400 hover:text-blue-300 shadow-lg shadow-blue-900/50 hover:scale-105"
                : "text-blue-600 hover:text-blue-500 shadow-md shadow-blue-800/40 hover:scale-105"
            }`}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 group-hover:from-blue-300 group-hover:to-blue-500">
              SchoolPay
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex ml-8 space-x-8">
            {[
              { to: "/transactions", label: "Transactions" },
              { to: "/create-payment", label: "Create Payment" },
              { to: "/status-check", label: "Status Check" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-medium transition-colors duration-300 group ${
                  theme === "dark"
                    ? "text-gray-50 hover:text-blue-400"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* User + Actions */}
          <div className="flex items-center space-x-4">
            <span
              className={`hidden sm:block text-sm font-medium ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {user ? `Welcome, ${getUsername(user.email)}` : ""}
            </span>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 shadow-md transform hover:scale-110 focus:outline-none ${
                theme === "dark"
                  ? "bg-yellow-400 hover:bg-yellow-300 shadow-yellow-500/50"
                  : "bg-gray-200 hover:bg-gray-300 shadow-gray-400/50"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-50"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-16v2m0 16v2m8-10h2M2 12H0m15.36-7.36l1.41 1.41M4.22 19.78l-1.41-1.41M19.78 19.78l-1.41-1.41M4.22 4.22l-1.41 1.41" />
                </svg>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="hidden sm:flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-sm transition-all duration-300 hover:bg-blue-600 hover:shadow-md hover:scale-105 focus:outline-none"
            >
              Logout
            </button>

            {/* Mobile Menu Button */}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded focus:outline-none z-50"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? (
                <X
                  size={26}
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  } transition-transform duration-300 hover:rotate-90 hidden`}
                />
              ) : (
                <Menu
                  size={26}
                  className={theme === "dark" ? "text-white" : "text-black"}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          className={`fixed inset-0 ${
            theme === "dark" ? "bg-black/60" : "bg-black/40"
          } z-40 transition-opacity duration-300`}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={`fixed top-0 right-0 w-64 h-full z-50 transform transition-transform duration-500 ease-in-out shadow-xl ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }
                bg-white text-gray-900`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
              <span className="font-bold text-lg">
                {" "}
                {user && (
                  <span
                    className="text-sm font-medium mb-2 
                      text-gray-800" 
                   
                  >
                    {getUsername(user.email)}
                  </span>
                )}
              </span>
              <button onClick={() => setMenuOpen(false)}>
                <X
                  size={28}
                  className="hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-4 bg-white">
              {[
                { to: "/transactions", label: "Transactions" },
                { to: "/create-payment", label: "Create Payment" },
                { to: "/status-check", label: "Status Check" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-2 py-2 rounded-md transition-colors duration-300 group hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar Drawer */}
    </header>
  );
};

export default Header;
