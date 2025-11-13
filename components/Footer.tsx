"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* === Brand Info === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-rose-600 mb-3">NariNest</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Your comfort, your confidence, your nest. Discover premium innerwear
            designed for the modern Bangladeshi woman.
          </p>
        </motion.div>

        {/* === Quick Links === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-rose-600">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="hover:text-rose-600 transition-colors duration-300 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-rose-600 transition-colors duration-300 font-medium"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-rose-600 transition-colors duration-300 font-medium"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-rose-600 transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* === Social Media === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center md:items-end"
        >
          <h3 className="text-lg font-semibold mb-4 text-rose-600">
            Follow Us
          </h3>
          <div className="flex space-x-5">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="hover:text-rose-600 transition-colors duration-300"
            >
              <FaFacebookF size={22} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-rose-600 transition-colors duration-300"
            >
              <FaInstagram size={22} />
            </Link>
            <Link
              href="https://tiktok.com"
              target="_blank"
              className="hover:text-rose-600 transition-colors duration-300"
            >
              <FaTiktok size={22} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-rose-100 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} NariNest. All rights reserved.
      </div>
    </footer>
  );
}
