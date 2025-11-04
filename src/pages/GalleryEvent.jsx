import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function GalleryEvent() {
  const { eventId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    API.get(`/api/gallery/${eventId}`)
      .then(res => setPhotos(res.data.photos || res.data))
      .catch(() => {
        // fallback
        setPhotos([
          "/assets/hero.jpg","/assets/hero.jpg","/assets/hero.jpg","/assets/hero.jpg",
          "/assets/hero.jpg","/assets/hero.jpg"
        ]);
      });
  }, [eventId]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Event: {eventId.replace(/-/g," ")}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((src, i) => (
          <div key={i} className="rounded overflow-hidden shadow bg-white">
            <img src={src} alt={`photo-${i}`} className="w-full h-56 object-cover transform hover:scale-105 transition"/>
            <div className="p-3 text-sm">Teacher day 2024</div>
          </div>
        ))}
      </div>
    </div>
  );
}
