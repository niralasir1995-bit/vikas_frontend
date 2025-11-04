import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Gallery() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/api/gallery")
      .then(res => setEvents(res.data))
      .catch(() => {
        // fallback events
        setEvents([
          { id: "teachers-day-2024", title: "Teachers Day 2024", cover: "/assets/hero.jpg", count: 12 },
          { id: "annual-day-2024", title: "Annual Day 2024", cover: "/assets/hero.jpg", count: 20 }
        ]);
      });
  }, []);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map(ev => (
          <div key={ev.id} className="bg-white rounded-lg shadow overflow-hidden">
            <Link to={`/gallery/${ev.id}`} className="block group">
              <div className="h-48 overflow-hidden">
                <img src={ev.cover || "/assets/hero.jpg"} alt={ev.title} className="w-full h-full object-cover transform group-hover:scale-105 transition"/>
              </div>
              <div className="p-4">
                <div className="font-semibold">{ev.title}</div>
                <div className="text-sm text-gray-500">{ev.count || "—"} photos</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
