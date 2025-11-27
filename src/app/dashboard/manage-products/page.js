"use client";

import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManageProducts() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      fetch("https://cosmetic-backend-delta.vercel.app/api/products")
        .then((res) => res.json())
        .then(setProducts)
        .catch(console.error);
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Manage Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded" />

            <h3 className="font-bold">{p.title}</h3>
            <p>{p.price}</p>
            <div className="flex gap-2 mt-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
