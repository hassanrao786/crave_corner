'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiMenu, HiX } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    router.push('/login')
  }

  const navLinks = [
    { href: '/blogs', label: 'Blogs' },
    { href: '/cities', label: 'Cities' },
    { href: '/recipes', label: 'Recipes' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/order', label: 'Order' },
    { href: '/delivary status', label: 'Delivary Status' },
    

  ]


  return (
    <nav className="bg-gray-900  fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png" // Make sure to add your logo in the public folder
                alt="Crave Corner"
                width={40}
                height={40}
                className="h-20 w-20"
              />
              <span className="ml-2 text-xl font-bold text-white hover:text-yellow-500 dark:text-">
                Crave Corner
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-yellow-400 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-black  px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
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
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-black block px-3 py-2 rounded-md text-base font-medium hover:bg-yellow-500"
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
  )
}

export default Navbar
