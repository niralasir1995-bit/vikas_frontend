import React, { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully (demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
        <input name="name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your Name" className="w-full p-3 border rounded" />
        <input name="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="Your Email" className="w-full p-3 border rounded" />
        <textarea name="message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Your Message" rows="4" className="w-full p-3 border rounded"></textarea>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">Send</button>
      </form>
    </div>
  );
}
