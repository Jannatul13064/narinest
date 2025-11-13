"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-rose-100">
        {/* Logo Section */}
        <Link href="/" className="">
          <Image
            src="/images/logoNariNest.png" // Replace with your logo path
            alt="Logo"
            width={130}
            height={20}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-rose-800 transition duration-300 font-medium hover:scale-105"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-medium">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-rose-600 text-white px-4 py-1 rounded hover:bg-rose-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-rose-600 text-white px-4 py-1 rounded hover:bg-rose-700 transition"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full backdrop-blur-md shadow-md flex flex-col items-center py-4 gap-4 bg-white/30 transition-all duration-300 ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-rose-600 hover:text-rose-100 transition-colors duration-300 font-medium"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {user ? (
          <div className="flex flex-col items-center gap-2">
            <span className="font-medium">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
