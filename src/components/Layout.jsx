import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] relative overflow-x-hidden">
      {/* Navbar — fixed position */}
      <Navbar />

      {/* Instead of spacer div, give padding to content wrapper */}
      <main
        className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 relative z-10"
        style={{ paddingTop: "110px" }} // replaces the spacer safely
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
