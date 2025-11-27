"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebase.config"; 
import { onAuthStateChanged, signOut } from "firebase/auth"; 

export default function AddProduct() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Protect page
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!title || !desc || !price || !image) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://cosmetic-backend-delta.vercel.app/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, price, image }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();
      console.log("Product added:", data);

      // Redirect to manage products after adding
      router.push("/dashboard/manage-products");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-20">Checking authentication...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Price (e.g. $25)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-3 rounded"
          required
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white py-3 rounded-lg"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
