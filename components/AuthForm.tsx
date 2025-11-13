"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

interface AuthFormProps {
  mode: "login" | "register";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login, register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      login(formData.email, formData.password);
      router.push("/products");
    } else {
      register(formData.name, formData.email, formData.password);
      router.push("/products");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 border border-zinc-100 dark:border-zinc-800"
      >
        <h1 className="text-3xl font-semibold text-center text-rose-100 mb-6">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="text-white">
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-lg dark:bg-zinc-800 focus:ring-2 focus:ring-rose-400"
              />
            </div>
          )}

          <div className="text-white">
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg dark:bg-zinc-800 focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <div className="text-white">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg dark:bg-zinc-800 focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition"
          >
            {mode === "login" ? "Login" : "Register"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <Link href="/register" className="text-rose-600 hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-rose-600 hover:underline">
                Login
              </Link>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}
