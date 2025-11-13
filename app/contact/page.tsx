"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", { name, email, message });
    alert("Thank you! We will contact you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center px-6 py-16 pt-35">
      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h1>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col gap-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-white/40 p-3 rounded bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-white/40 p-3 rounded bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="border border-white/40 p-3 rounded bg-white/20 text-white placeholder-white/70 h-32 focus:ring-2 focus:ring-rose-400 focus:outline-none transition resize-none"
        />
        <motion.button
          type="submit"
          className="px-6 py-3 bg-rose-500 hover:bg-rose-700 text-white font-semibold rounded shadow-lg transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </motion.button>
      </motion.form>

      {/* Note */}
      <motion.p
        className="mt-8 text-white/80 text-sm text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Orders are placed via the Shop page. Payment method is Cash on Delivery.
      </motion.p>
    </div>
  );
}
