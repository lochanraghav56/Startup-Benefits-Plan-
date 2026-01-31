"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login successful!");
    } else {
      alert("Login failed!");
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-4 w-full"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-4 w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Login
      </button>
    </main>
  );
}
