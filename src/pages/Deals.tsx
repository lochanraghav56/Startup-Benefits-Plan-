"use client";
import { useState, useEffect } from "react";

interface Deal {
  _id: string;
  title: string;
  description: string;
  category: string;
  locked: boolean;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/deals")
      .then(res => res.json())
      .then(data => setDeals(data));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Deals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deals.map(deal => (
          <div
            key={deal._id}
            className={`p-6 rounded-lg shadow-md ${
              deal.locked ? "bg-gray-300" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold">{deal.title}</h2>
            <p>{deal.description}</p>
            <a
              href={`/deals/${deal._id}`}
              className="text-indigo-600 mt-4 inline-block"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
