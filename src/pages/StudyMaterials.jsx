import React, { useEffect, useState } from "react";
import API from "../api";

export default function StudyMaterialsPage() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.get(`/api/materials`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => setMaterials(res.data))
      .catch(() => {
        setMaterials([
          { id:1, title: "Math Chapter 4", type: "pdf", url: "/assets/hero.jpg" },
          { id:2, title: "Science Notes", type: "doc", url: "https://example.com/sample.doc" }
        ]);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Study Materials</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {materials.map(m => (
          <div key={m.id} className="bg-white p-4 rounded shadow">
            <div className="font-medium">{m.title}</div>
            <div className="text-sm text-gray-500 mb-3">{m.type.toUpperCase()}</div>
            <div className="flex gap-2">
              <a href={m.url} target="_blank" rel="noreferrer" className="px-3 py-1 rounded border text-sm">Open</a>
              <a href={m.url} download className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
