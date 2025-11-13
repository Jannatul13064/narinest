"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Types
interface Order {
  id: string;
  product: string;
  image: string;
  price: number;
  quantity: number;
  status: "Delivered" | "Processing" | "Cancelled";
  date: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  avatar: string;
}

// Mock data
const mockUser: User = {
  name: "Sarah Khan",
  email: "sarah@example.com",
  phone: "+880123456789",
  joinDate: "2023-01-15",
  avatar: "/images/avatar.jpg",
};

const mockOrders: Order[] = [
  {
    id: "#1023",
    product: "Elegant Bra Set",
    image: "/images/product1.jpg",
    price: 1200,
    quantity: 1,
    status: "Delivered",
    date: "2025-11-01",
  },
  {
    id: "#1024",
    product: "Silky Nighty",
    image: "/images/product2.jpg",
    price: 900,
    quantity: 2,
    status: "Processing",
    date: "2025-11-08",
  },
  {
    id: "#1025",
    product: "Bikini Set",
    image: "/images/product3.jpg",
    price: 1500,
    quantity: 1,
    status: "Cancelled",
    date: "2025-11-10",
  },
];

export default function UserDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCancel = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;
  const processingOrders = orders.filter(
    (o) => o.status === "Processing"
  ).length;
  const cancelledOrders = orders.filter((o) => o.status === "Cancelled").length;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pt-35">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-rose-600 mb-10 text-center"
      >
        👩‍🛍️ My Dashboard
      </motion.h1>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-xl p-6 mb-10 flex flex-col md:flex-row items-center gap-6"
      >
        <div className="flex items-center gap-4">
          <Image
            src={mockUser.avatar}
            alt="User Avatar"
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-rose-600"
          />
          <div>
            <p className="text-gray-700 font-medium">Name</p>
            <p className="text-xl font-semibold text-rose-600">
              {mockUser.name}
            </p>
            <p className="text-gray-500">{mockUser.email}</p>
            <p className="text-gray-500">{mockUser.phone}</p>
            <p className="text-gray-500 text-sm">
              Member Since: {mockUser.joinDate}
            </p>
          </div>
        </div>
        <button className="ml-auto px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition">
          Edit Profile
        </button>
      </motion.div>

      {/* Orders Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Orders",
            value: totalOrders,
            color: "bg-rose-100 text-rose-700",
          },
          {
            label: "Delivered",
            value: deliveredOrders,
            color: "bg-green-100 text-green-700",
          },
          {
            label: "Processing",
            value: processingOrders,
            color: "bg-yellow-100 text-yellow-700",
          },
          {
            label: "Cancelled",
            value: cancelledOrders,
            color: "bg-red-100 text-red-700",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`p-6 rounded-xl shadow hover:shadow-lg transition ${stat.color} text-center`}
          >
            <p className="font-medium">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-xl p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Recent Orders
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-rose-100 text-gray-700">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Product</th>
                <th className="p-3">Price</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{order.id}</td>
                  <td className="p-3 flex items-center gap-2">
                    <Image
                      src={order.image}
                      alt={order.product}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    {order.product}
                  </td>
                  <td className="p-3">৳ {order.price}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    {order.status === "Processing" && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 w-11/12 md:w-1/2"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Order Details</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-800"
              >
                ✖
              </button>
            </div>
            <p className="mb-2">
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p className="mb-2">
              <strong>Product:</strong> {selectedOrder.product}
            </p>
            <p className="mb-2">
              <strong>Price:</strong> ৳ {selectedOrder.price}
            </p>
            <p className="mb-2">
              <strong>Quantity:</strong> {selectedOrder.quantity}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <p className="mb-2">
              <strong>Date:</strong> {selectedOrder.date}
            </p>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </main>
  );
}
