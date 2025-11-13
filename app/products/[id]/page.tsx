"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";

import OrderForm from "@/components/OrderForm";
import { Product } from "@/components/ProductsList";

// Products Data
const products: Product[] = [
  {
    id: 1,
    name: "Elegant Bra Set",
    price: 1200,
    image: "/images/product1.png",
    description: "Comfortable and stylish bra set for everyday use.",
  },
  {
    id: 2,
    name: "Silky Nighty",
    price: 900,
    image: "/images/product2.png",
    description: "Soft and breathable nightwear for a good night sleep.",
  },
  {
    id: 3,
    name: "Bikini Set",
    price: 1500,
    image: "/images/product3.jpg",
    description: "Trendy bikini set, perfect for summer outings.",
  },
  {
    id: 4,
    name: "Comfort Panty",
    price: 400,
    image: "/images/product4.jpg",
    description: "Soft and comfortable panty for everyday wear.",
  },
  {
    id: 5,
    name: "Comfort Panty",
    price: 400,
    image: "/images/product1.png",
    description: "Soft and comfortable panty for everyday wear.",
  },
  {
    id: 6,
    name: "Comfort Panty",
    price: 400,
    image: "/images/product2.png",
    description: "Soft and comfortable panty for everyday wear.",
  },
  {
    id: 7,
    name: "Comfort Panty",
    price: 400,
    image: "/images/product3.jpg",
    description: "Soft and comfortable panty for everyday wear.",
  },
  {
    id: 8,
    name: "Comfort Panty",
    price: 400,
    image: "/images/product4.jpg",
    description: "Soft and comfortable panty for everyday wear.",
  },
];

export default function ProductPage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState<number>(1);
  const [shippingCharge] = useState<number>(100); // flat shipping rate
  const [showOrderForm, setShowOrderForm] = useState<boolean>(false);
  const [showInvoicePreview, setShowInvoicePreview] = useState<boolean>(false);

  if (!product)
    return <p className="text-center mt-20 text-red-600">Product not found!</p>;

  const subtotal = product.price * quantity;
  const grandTotal = subtotal + shippingCharge;

  // Generate invoice data on demand
  const generateInvoiceData = () => {
    return {
      invoiceNumber: `NN-${Date.now()}`,
      orderDate: new Date().toLocaleString(),
    };
  };

  const handleDownloadInvoice = () => {
    const { invoiceNumber, orderDate } = generateInvoiceData();
    const doc = new jsPDF();

    // Logo in public folder
    const logoPath = "@/logoNariNest.png";

    doc.setFontSize(16);
    doc.text("🧾 NariNest Invoice", 105, 20, { align: "center" });
    doc.setFontSize(12);

    doc.text(`Invoice No: ${invoiceNumber}`, 15, 35);
    doc.text(`Order Date: ${orderDate}`, 15, 43);
    doc.text(`Product: ${product.name}`, 15, 55);
    doc.text(`Quantity: ${quantity}`, 15, 63);
    doc.text(`Price per item: ৳ ${product.price}`, 15, 71);
    doc.text(`Shipping Charge: ৳ ${shippingCharge}`, 15, 79);
    doc.text(`Grand Total: ৳ ${grandTotal}`, 15, 87);
    doc.text(`Payment Method: Cash on Delivery`, 15, 95);
    doc.text(`Delivery Address: Your address here`, 15, 103);
    doc.text(`Thank you for shopping with NariNest!`, 15, 120);

    doc.save(`Invoice_${product.name}_${Date.now()}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 pt-35">
      <motion.div
        className="flex flex-col md:flex-row gap-10 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Image */}
        <motion.div whileHover={{ scale: 1.05 }} className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-xl object-cover shadow-lg"
          />
        </motion.div>

        {/* Product Details */}
        <div className="flex flex-col gap-5 w-full md:w-1/2">
          <motion.h1
            className="text-4xl font-bold text-rose-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.name}
          </motion.h1>

          <motion.p
            className="text-gray-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {product.description}
          </motion.p>

          {/* Pricing */}
          <motion.div
            className="text-gray-800 text-2xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Subtotal: ৳ {subtotal}
          </motion.div>
          <div className="text-gray-600 text-lg">
            Shipping: ৳ {shippingCharge}
          </div>
          <div className="text-rose-600 text-2xl font-bold mt-2">
            Grand Total: ৳ {grandTotal}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-4 py-2 bg-rose-100 rounded-lg hover:bg-rose-200 transition"
            >
              -
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-4 py-2 bg-rose-100 rounded-lg hover:bg-rose-200 transition"
            >
              +
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <motion.button
              onClick={() => setShowOrderForm(true)}
              className="px-8 py-3 bg-rose-600 text-white font-semibold rounded-lg shadow-lg hover:bg-rose-700 transition transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.button>

            <motion.button
              onClick={() => setShowInvoicePreview(true)}
              className="px-8 py-3 border border-rose-600 text-rose-600 font-semibold rounded-lg hover:bg-rose-50 transition transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              Preview Invoice
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <OrderForm
          product={{ ...product, quantity }}
          onClose={() => setShowOrderForm(false)}
        />
      )}

      {/* Invoice Preview Modal */}
      {showInvoicePreview && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 relative">
            <button
              onClick={() => setShowInvoicePreview(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-rose-600">
              Invoice Preview
            </h2>
            <p>Product: {product.name}</p>
            <p>Quantity: {quantity}</p>
            <p>Price per item: ৳ {product.price}</p>
            <p>Shipping Charge: ৳ {shippingCharge}</p>
            <p className="font-semibold text-lg mt-2">
              Grand Total: ৳ {grandTotal}
            </p>
            <p className="mt-2 text-gray-600">
              Payment Method: Cash on Delivery
            </p>
            <p className="text-gray-600">Delivery Address: Your address here</p>

            <button
              onClick={handleDownloadInvoice}
              className="mt-6 px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
            >
              Download Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
