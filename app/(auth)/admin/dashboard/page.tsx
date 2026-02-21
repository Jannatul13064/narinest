"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------- Types ---------- */
interface SalesData {
  month: string;
  revenue: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

/* ---------- Main Component ---------- */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "customers"
  >("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaChartLine /> },
    { id: "products", label: "Products", icon: <FaBox /> },
    { id: "orders", label: "Orders", icon: <FaShoppingCart /> },
    { id: "customers", label: "Customers", icon: <FaUsers /> },
  ] as const;

  const salesData: SalesData[] = [
    { month: "Jan", revenue: 30000 },
    { month: "Feb", revenue: 45000 },
    { month: "Mar", revenue: 52000 },
    { month: "Apr", revenue: 61000 },
    { month: "May", revenue: 80000 },
    { month: "Jun", revenue: 74000 },
  ];

  return (
    <main className="min-h-screen pt-35">
      {/* Header */}
      <div className="flex justify-between items-center shadow p-6">
        <h1 className="text-2xl font-bold text-rose-600">Admin Dashboard</h1>
        <button className="flex items-center space-x-2 bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition">
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 p-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
              activeTab === tab.id
                ? "bg-rose-600 text-white"
                : "bg-gray-100 hover:bg-rose-100 text-gray-700"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto p-6"
      >
        {activeTab === "overview" && <OverviewSection data={salesData} />}
        {activeTab === "products" && <ProductsSection />}
        {activeTab === "orders" && <OrdersSection />}
        {activeTab === "customers" && <CustomersSection />}
      </motion.div>
    </main>
  );
}

/* ---------- Overview Section ---------- */
function OverviewSection({ data }: { data: SalesData[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-rose-600 mb-4">
        Business Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Orders" value={842} icon={<FaShoppingCart />} />
        <StatCard title="Total Products" value={128} icon={<FaBox />} />
        <StatCard title="Active Customers" value={245} icon={<FaUsers />} />
        <StatCard
          title="Monthly Revenue"
          value="৳ 80,000"
          icon={<FaChartLine />}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-gray-700 mb-4">Revenue Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#e11d48"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------- Products Section ---------- */
function ProductsSection() {
  const products = [
    { id: 1, name: "Elegant Bra Set", price: 1200, stock: 45 },
    { id: 2, name: "Silky Nighty", price: 900, stock: 30 },
    { id: 3, name: "Bikini Set", price: 1500, stock: 25 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-rose-600">Manage Products</h2>
        <button className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition">
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-rose-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">৳ {p.price}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 space-x-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Orders Section ---------- */
function OrdersSection() {
  const orders = [
    { id: "#1023", customer: "Sarah", total: 1200, status: "Delivered" },
    { id: "#1022", customer: "Lina", total: 900, status: "Processing" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-rose-600 mb-4">
        Recent Orders
      </h2>
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-rose-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3 font-semibold">৳ {order.total}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Customers Section ---------- */
function CustomersSection() {
  const customers = [
    { id: 1, name: "Sarah", email: "sarah@example.com", totalOrders: 5 },
    { id: 2, name: "Lina", email: "lina@example.com", totalOrders: 3 },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-rose-600 mb-4">Customers</h2>
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-rose-100">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.id}</td>
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.totalOrders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Reusable Stat Card ---------- */
function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center space-y-3"
    >
      <div className="text-rose-600 text-3xl">{icon}</div>
      <h4 className="text-gray-600 font-semibold">{title}</h4>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
}
