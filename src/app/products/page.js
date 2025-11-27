"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Products() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://cosmetic-backend-delta.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="shadow p-4 rounded-lg bg-white">
            <img src={item.image} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-bold mt-3">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
            <p className="font-bold mt-2">{item.price}</p>
            <Link href={`/product/${item.id}`} className="text-pink-600 mt-3 inline-block">Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
