import React from "react";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p className="text-gray-600 mb-6">
        Vikas Education Hub is committed to delivering quality education and guidance to students.
        Our aim is to build confident, capable, and inspired learners.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h4 className="font-semibold">Vision</h4>
          <p className="text-sm text-gray-500 mt-2">To empower every learner to achieve excellence.</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-sm">
          <h4 className="font-semibold">Mission</h4>
          <p className="text-sm text-gray-500 mt-2">To provide quality learning resources and mentorship.</p>
        </div>
      </div>
    </div>
  );
}
