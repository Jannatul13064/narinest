"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import OrderForm from "./OrderForm";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [showOrder, setShowOrder] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const totalPrice = product.price * quantity;

  return (
    <motion.div
      className="bg-white/90 shadow-lg hover:shadow-2xl rounded-2xl p-5 flex flex-col items-center space-y-4 border border-gray-100 transition-all duration-300 backdrop-blur-sm"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Product Image */}
      <motion.div
        className="overflow-hidden rounded-xl w-full"
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={200}
          className="rounded-xl object-cover w-full h-56 transition-transform duration-500"
        />
      </motion.div>

      {/* Product Details */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-rose-600 tracking-wide">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Dynamic Price Display */}
        <motion.p
          key={totalPrice}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-lg font-semibold text-gray-900"
        >
          ৳ {totalPrice.toLocaleString()}
          {quantity > 1 && (
            <span className="text-gray-500 text-xs ml-1">
              ({quantity} × ৳{product.price})
            </span>
          )}
        </motion.p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center gap-3 mt-1">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-md font-bold transition"
        >
          −
        </button>
        <motion.span
          key={quantity}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="font-semibold text-gray-700"
        >
          {quantity}
        </motion.span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-md font-bold transition"
        >
          +
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full mt-3">
        <motion.button
          onClick={() => setShowOrder(true)}
          className="flex-1 px-5 py-2.5 bg-rose-600 text-white rounded-lg font-semibold shadow-md hover:bg-rose-700 transition transform hover:-translate-y-1 hover:shadow-lg"
          whileTap={{ scale: 0.97 }}
        >
          Order Now
        </motion.button>

        <motion.button
          onClick={() => router.push(`/products/${product.id}`)}
          className="flex-1 px-5 py-2.5 border border-rose-600 text-rose-600 rounded-lg font-semibold hover:bg-rose-50 hover:text-rose-700 transition transform hover:-translate-y-1 hover:shadow-md"
          whileTap={{ scale: 0.97 }}
        >
          View Details
        </motion.button>
      </div>

      {/* Order Form Modal */}
      {showOrder && (
        <OrderForm
          product={{ ...product, quantity }}
          onClose={() => setShowOrder(false)}
        />
      )}
    </motion.div>
  );
}
