import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 h-16">
        <div className="flex items-center gap-2">
          <a href="/">
            <FileText className="text-blue-600 dark:text-blue-400" size={24} />
          </a>
          <a href="/">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              AI Meeting Notes
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors ${
                location.pathname === link.to
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button
            className="inline-flex items-center px-3 py-1 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2 transition-colors ${
                  location.pathname === link.to
                    ? "text-blue-600 font-medium"
                    : "text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
