import React from "react";

export default function Founders() {
  const founders = [
    {
      name: "Rajesh Kumar",
      role: "Founder",
      desc: "Guiding students toward excellence since 2010.",
    },
    {
      name: "Anita Sharma",
      role: "Director",
      desc: "Dedicated to innovative education practices.",
    },
    {
      name: "Ravi Singh",
      role: "Co-Director",
      desc: "Inspiring young minds for a brighter future.",
    },
  ];

  return (
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {founders.map((f, i) => (
        <div
          key={i}
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold">{f.name}</h3>
          <p className="text-sm text-gray-300">{f.role}</p>
          <p className="mt-2 text-sm">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
