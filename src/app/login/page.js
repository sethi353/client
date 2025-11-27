"use client";

import { useState } from "react";
import Link from "next/link";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.config";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); 
    } catch {
      setError("Invalid credentials");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch {
      setError("Google login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow bg-white rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded"
          required
        />
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button className="bg-pink-600 text-white py-3 rounded-lg">Login</button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
      >
        Login with Google
      </button>
      <p className="text-center mt-4 text-gray-600">
        Don't have an account? 
        <Link href="/register" className="text-pink-600">
    Register
  </Link>
      </p>
    </div>
  );
}
