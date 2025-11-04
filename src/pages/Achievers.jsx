import React from "react";

export default function Achievers() {
  const achievers = [
    { id: 1, name: "Anita Sharma", rank: "1", year: 2024, photo: "/assets/achiever1.jpg" },
    { id: 2, name: "Rahul Verma", rank: "2", year: 2024, photo: "/assets/achiever2.jpg" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Our Achievers</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {achievers.map(a => (
          <div key={a.id} className="bg-white p-4 rounded-lg shadow text-center">
            <img src={a.photo} alt={a.name} className="w-28 h-28 mx-auto rounded-full object-cover" />
            <p className="mt-2 font-semibold">{a.name}</p>
            <p className="text-sm text-gray-500">Rank {a.rank} ({a.year})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
