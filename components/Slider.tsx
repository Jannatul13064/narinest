"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/slider/slider1.jpg",
    alt: "NariNest - Elegant Lingerie",
    caption: "Elegant Comfort, Designed for You 💖",
    sub: "Experience luxury and confidence with every wear.",
  },
  {
    id: 2,
    image: "/images/slider/slider2.jpg",
    alt: "Comfortable Nightwear",
    caption: "Soft Nightwear for Serene Evenings 🌙",
    sub: "Drift into dreamland with unmatched softness and style.",
  },
  {
    id: 3,
    image: "/images/slider/slider3.jpg",
    alt: "Stylish Bikini Sets",
    caption: "Be Confident. Be You. 🌺",
    sub: "Redefine elegance with our modern innerwear collection.",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] overflow-hidden rounded-3xl shadow-2xl">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Elegant Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                {/* Caption Content */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute inset-x-0 bottom-20 md:bottom-28 text-center px-6"
                >
                  <div className="inline-block bg-black/40 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide drop-shadow-lg mb-2">
                      {slide.caption}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                      {slide.sub}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-rose-500 scale-125 shadow-md"
                : "bg-white/50 hover:bg-white/80"
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Optional gradient border glow for elegance */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-rose-100/30 pointer-events-none"></div>
    </div>
  );
}
