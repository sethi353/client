"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../../firebase.config"; 
import { onAuthStateChanged } from "firebase/auth"; 

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch product data
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://cosmetic-backend-delta.vercel.app/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (!user) return <p className="text-center mt-20">Checking authentication...</p>;
  if (loading) return <p className="text-center mt-20">Loading product...</p>;
  if (!product) return <p className="text-center mt-20 text-red-500">Product not found</p>;

  return (
    <div className="mt-10 max-w-3xl mx-auto p-4 shadow bg-white rounded-lg">
      <h2 className="text-3xl font-bold">{product.title}</h2>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded mt-4"
      />
      <p className="mt-4 text-gray-700">{product.desc}</p>
      <p className="font-bold mt-2">{product.price}</p>
      <Link href="/products" className="inline-block mt-6 text-pink-600">
        ⬅ Back to Products
      </Link>
    </div>
  );
}
