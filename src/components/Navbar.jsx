"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase.config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) router.push("/"); 
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); 
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="w-full px-6 py-4 shadow bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          Cosmetics
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <Link href="/products" className="hover:text-pink-600">Products</Link>
          <Link href="/dashboard/manage-products" className="hover:text-pink-600">Manage</Link>
          <Link href="/dashboard/add-product" className="hover:text-pink-600">Add Product</Link>

          {!user ? (
            <Link href="/login" className="bg-pink-500 text-white px-4 py-2 rounded-lg">
              Login
            </Link>
          ) : (
            <>
              <span className="font-medium">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-pink-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-4">
          <Link href="/" className="hover:text-pink-600">Home</Link>
          <Link href="/products" className="hover:text-pink-600">Products</Link>
          <Link href="/dashboard/manage-products" className="hover:text-pink-600">Manage</Link>
          <Link href="/dashboard/add-product" className="hover:text-pink-600">Add Product</Link>

          {!user ? (
            <Link href="/login" className="bg-pink-500 text-white px-4 py-2 rounded-lg">
              Login
            </Link>
          ) : (
            <>
              <span className="font-medium">{user.email}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
