"use client";
import { useEffect, useState } from "react";

export default function DealDetailsPage({ params }: { params: { id: string } }) {
  const [deal, setDeal] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/deals/${params.id}`)
      .then(res => res.json())
      .then(data => setDeal(data));
  }, [params.id]);

  if (!deal) return <p>Loading...</p>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{deal.title}</h1>
      <p className="mt-4">{deal.description}</p>
      <p className="mt-2 text-gray-600">Partner: {deal.partner}</p>
      <button
        onClick={() =>
          fetch(`http://localhost:5000/deals/${deal._id}/claim`, {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          })
        }
        className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Claim Deal
      </button>
    </main>
  );
}
