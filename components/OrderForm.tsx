"use client";

import { useState } from "react";

type ProductWithQty = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export default function OrderForm({
  product,
  onClose,
}: {
  product: ProductWithQty;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      productId: product.id,
      productName: product.name,
      quantity: product.quantity,
      customerName: name,
      address,
      contact,
      paymentMethod: "Cash on Delivery",
    };
    console.log("Order Placed:", order);
    alert("Order Placed Successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 w-11/12 md:w-96 flex flex-col space-y-3 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-rose-600">
          Order {product.name} ({product.quantity})
        </h3>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <p className="text-sm text-gray-500">Payment: Cash on Delivery</p>

        <div className="flex justify-between mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
