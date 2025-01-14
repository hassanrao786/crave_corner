"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    // Redirect to login
    window.location.href = "/login";
  };

  const navLinks = [
    { href: "/blogs", label: "Blogs" },
    { href: "/cities", label: "Cities" },
    { href: "/recipes", label: "Recipes" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
   
    { href: "/admin/login", label: "Admin Panel" }
  ];

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/herro.jpeg"
                alt="Crave Corner"
                width={96}
                height={96}
                className="h-12 w-12"
              />
              <span className="ml-3 text-2xl font-bold text-yellow-500">
                Crave Corner
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  pathname === link.href ? "text-yellow-500" : "text-white"
                } hover:text-yellow-500 text-sm font-medium transition duration-200`}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-700 text-white rounded-lg transition duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-yellow-500 text-sm font-medium transition duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-medium hover:bg-yellow-400 transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              className="inline-flex items-center justify-center p-2 rounded-md text-yellow-500 hover:bg-gray-800 transition duration-200"
            >
              {isOpen ? (
                <HiX className="block h-6 w-6" />
              ) : (
                <HiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-gray-300 ${
                  pathname === link.href ? "text-yellow-500" : ""
                } hover:text-yellow-500 px-4 py-2 rounded-lg text-base font-medium transition duration-200`}
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full text-left bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-base font-medium transition duration-200"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block w-full text-left text-gray-300 hover:text-yellow-500 px-4 py-2 rounded-lg text-base font-medium transition duration-200"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-left bg-yellow-500 text-black hover:bg-yellow-400 px-4 py-2 rounded-lg text-base font-medium transition duration-200"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
