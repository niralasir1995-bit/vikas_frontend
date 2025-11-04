import React, { useEffect, useState } from "react";
import API from "../api";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [links, setLinks] = useState([]);
  const [whatsappMsgs, setWhatsappMsgs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Try your real API. If it fails, fallback to mock data
    API.get(`/api/notifications`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      .then(res => {
        const data = res.data;
        // server may return mixed types; split them
        setNotifications(data.filter(d => !d.type || d.type === "msg"));
        setPhotos(data.filter(d => d.type === "photo"));
        setVideos(data.filter(d => d.type === "video"));
        setLinks(data.filter(d => d.type === "link"));
        setWhatsappMsgs(data.filter(d => d.type === "whatsapp"));
      })
      .catch(() => {
        // fallback mock
        const mock = [
          { id: 1, title: "Welcome!", message: "Demo notifications active.", type: "msg" },
          { id: 2, title: "Teachers Day 2024", message: "Photos uploaded", type: "photo", link: "/gallery/event-teachers-day-2024" },
          { id: 3, title: "Exam Schedule", message: "Final exams start 10 Nov", type: "msg" },
          { id: 4, title: "Important Link", message: "Download timetable", type: "link", link: "https://example.com/timetable" }
        ];
        setNotifications(mock);
        setPhotos(mock.filter(m=>m.type==="photo"));
        setLinks(mock.filter(m=>m.type==="link"));
        setWhatsappMsgs([{ id: 1, message: "Welcome to Vikash Education Hub (WhatsApp style message)" }]);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>

      <section className="bg-white rounded-lg shadow mb-6 p-4">
        <h3 className="font-medium mb-2">Current News / Messages</h3>
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className="p-3 border rounded">
              <div className="font-semibold">{n.title || "Notice"}</div>
              <div className="text-sm text-gray-600">{n.message || n.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-medium mb-3">Photos</h4>
          <div className="grid grid-cols-2 gap-2">
            {photos.map(p => (
              <a key={p.id} href={p.link || "#"} className="block rounded overflow-hidden">
                <img alt={p.title} src={p.fileUrl || "/assets/hero.jpg"} className="w-full h-28 object-cover transform hover:scale-105 transition" />
                <div className="text-sm p-2">{p.title}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="font-medium mb-3">Videos / Links</h4>
          <div className="space-y-2">
            {videos.map(v=> (
              <a key={v.id} className="block p-3 border rounded" href={v.link || "#"} target="_blank" rel="noreferrer">{v.title || "Video link"}</a>
            ))}
            {links.map(l=> (
              <a key={l.id} className="block p-3 border rounded" href={l.link || "#"} target="_blank" rel="noreferrer">{l.title || l.message}</a>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 bg-white rounded-lg shadow p-4">
        <h4 className="font-medium mb-3">WhatsApp-style feed</h4>
        <div className="whitespace-nowrap overflow-hidden">
          <div className="animate-marquee inline-block">
            {whatsappMsgs.map((m, i) => (
              <span key={i} className="inline-block px-6 py-2 mr-4 bg-gray-100 rounded">{m.message}</span>
            ))}
          </div>
        </div>
        <style>{`
          .animate-marquee { animation: marquee 18s linear infinite; }
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </section>
    </div>
    </div>
  );
}
