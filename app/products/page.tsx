import React from "react";
import ProductsList from "@/components/ProductsList";

const productData = [
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

export default function ProductsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 pt-32">
      <h1 className="text-3xl font-bold text-rose-600 mb-8">Our Products</h1>
      <ProductsList products={productData} /> {/* ✅ Pass the prop here */}
    </main>
  );
}
