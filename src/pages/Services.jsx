import React from "react";

export default function Services() {
  const services = [
    { id: 1, name: "Online Classes", desc: "Live and recorded classes for all subjects." },
    { id: 2, name: "Career Guidance", desc: "Helping students choose the right career path." },
    { id: 3, name: "Scholarship Help", desc: "Guidance for various scholarship exams." },
  ];

  return (
    <div className=" max-w-4xl mx-auto px-10 py-10">
      <h2 className="text-2xl font-bold mb-4">Our Services</h2>
      {services.map(s => (
        <details key={s.id} className="mb-3 bg-white p-4 rounded-md shadow-sm">
          <summary className="font-medium cursor-pointer">{s.name}</summary>
          <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
        </details>
      ))}
    </div>
  );
}