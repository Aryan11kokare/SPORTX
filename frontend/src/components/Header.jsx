import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ cartCount, onCartClick, isLogin, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const route = useNavigate();

  return (
    <header className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <h1
              onClick={() => route("/")}
              className="text-2xl  cursor-pointer font-bold tracking-tight"
            >
              SPORTX
            </h1>
            <nav className="hidden md:flex space-x-8">
              {isLogin === true && (
                <Link
                  to={"addProduct"}
                  className="hover:text-gray-300  transition-colors"
                >
                  Add Item
                </Link>
              )}
              <a href="#" className="hover:text-gray-300 transition-colors">
                Categories
              </a>
              {isLogin === true ? (
                <button
                  onClick={onLogout}
                  className="hover:text-gray-300 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to={"/signup"}
                    className="hover:text-gray-300 transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to={"/login"}
                    className="hover:text-gray-300 transition-colors"
                  >
                    Log In
                  </Link>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <button className="hover:text-gray-300 transition-colors hidden sm:block">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button
              onClick={onCartClick}
              className="relative hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800">
          <nav className="px-4 py-4 space-y-2">
            {isLogin === true && (
              <Link
                to={"addProduct"}
                className="hover:text-gray-300  transition-colors"
              >
                Add Item
              </Link>
            )}
            <a
              href="#"
              className="block py-2 hover:text-gray-300 transition-colors"
            >
              Categories
            </a>
            <Link
              to={"/signup"}
              className="block py-2 hover:text-gray-300 transition-colors"
            >
              Sign UP
            </Link>
            <Link
              to={"/login"}
              className="block py-2 hover:text-gray-300 transition-colors"
            >
              Log IN
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
