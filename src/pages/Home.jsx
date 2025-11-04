import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

// You can use your own background image path here:
const heroImage = "../assets/hero.jpg"; // Replace with your image path

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
        <section className="relative h-[90vh] mt-[110px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background image with dim overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-4">
          {/* Logo + Title */}
          <div className="flex flex-col items-center justify-center mb-6">
            <img
              src={logo}
              alt="Vikash Logo"
              className="w-20 h-20 rounded-full border-2 border-white/60 shadow-lg mb-3"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
              VIKASH EDUCATION HUB
            </h1>
            <p className="mt-3 text-lg md:text-xl text-indigo-200 font-medium">
              Your Educational Hub In Your Hand
            </p>
          </div>

          {/* Intro paragraph */}
          <p className="text-gray-200 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Empowering Students and Teachers with Curated Study Materials,
            Streamlined Test Management, and a Vision to Transform Education
            through Technology.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Link
              to="/study-materials"
              className="px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              Explore Study Material
            </Link>
            <Link
              to="/gallery"
              className="px-5 py-3 rounded-md bg-white text-indigo-700 hover:bg-yellow-100 font-semibold transition"
            >
              View Gallery
            </Link>
          </div>
        </div>

        {/* Decorative gradient at bottom for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/90 to-transparent"></div>
      </section>

      {/* Optional small intro features below */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-3 gap-6 text-center">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="font-semibold text-indigo-700 mb-2">Study Materials</h3>
          <p className="text-gray-600 text-sm">
            Access curated notes, question papers and reference PDFs.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="font-semibold text-indigo-700 mb-2">Notifications</h3>
          <p className="text-gray-600 text-sm">
            Stay updated with institute news, events and announcements.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
          <h3 className="font-semibold text-indigo-700 mb-2">Achievements</h3>
          <p className="text-gray-600 text-sm">
            Celebrate our toppers, achievements and memorable moments.
          </p>
        </div>
      </section>
    </div>
  );
}