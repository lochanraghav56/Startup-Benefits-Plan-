"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [claims, setClaims] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/deals/claims/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setClaims(data));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Claimed Deals</h1>
      {claims.length === 0 ? (
        <p>No deals claimed yet.</p>
      ) : (
        <ul>
          {claims.map(claim => (
            <li key={claim._id} className="mb-4 p-4 border rounded-lg">
              <h2 className="text-xl">{claim.deal.title}</h2>
              <p>Status: {claim.status}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
