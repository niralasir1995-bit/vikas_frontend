import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    setNotices([
      { id: 1, title: "Job Opening - Math Teacher", info: "Apply before 10 Nov 2025" },
      { id: 2, title: "Exam Schedule Released", info: "Term 1 exam starts from 15 Dec 2025" },
      { id: 3, title: "Workshop on AI", info: "Register for free by 5 Nov" },
    ]);
  }, []);

  return (
    <div className=" max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <div className="space-y-4">
        {notices.map(n => (
          <div key={n.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold text-indigo-600">{n.title}</h3>
            <p className="text-gray-600 text-sm">{n.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
