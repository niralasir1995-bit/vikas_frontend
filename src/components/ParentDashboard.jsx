import React, { useEffect, useState } from "react";
import API from "../api";


export default function ParentDashboard({ user, onLogout }) {
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fees, setFees] = useState([]);         
  const [performance, setPerformance] = useState([]); 
  const [notices, setNotices] = useState([]);   // ✅ added notices state
  const token = localStorage.getItem("token");
  const role = "parent";

  useEffect(() => {
    let storedStudent = JSON.parse(localStorage.getItem("student"));
    if (storedStudent && storedStudent._id) {
      setChild(storedStudent);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (child?._id) {
      // performance
      API
        .get(
          `/attempts/results?role=student&studentId=${child._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => setPerformance(res.data || []))
        .catch((err) => console.error("Error fetching performance:", err));

      // fees
      API
        .get(`/fees/student/${child._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setFees(res.data || []))
        .catch((err) => console.error("Error fetching fees:", err));

      // ✅ notices
      API
        .get(`/notifications/student/${child._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setNotices(res.data || []))
        .catch((err) => console.error("Error fetching notices:", err));
    }
  }, [child, token]);

  if (loading)
    return (
      <div className="p-8 text-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
        <p>Loading your dashboard...</p>
      </div>
    );

  if (!child)
    return (
      <div className="p-8 text-center text-red-500">
        ⚠️ No linked student found. Please contact the school.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Header */}
      {/* 🔹 Common Header Box */}
<div
  style={{
    background: "#6b21a8",
    color: "white",
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h2>
    {role === "admin" && `🧑‍💼 Welcome, ${user?.name || "Admin"}`}
    {role === "teacher" && `👨‍🏫 Welcome, ${teacher?.name || "Teacher"}`}
    {role === "parent" && `👨‍👩‍👧 Welcome, ${user?.name || "Parent"}`}
    {role === "student" && `👨‍🎓 Welcome, ${user?.name || "Student"}`}
  </h2>

  <div style={{ display: "flex", gap: "10px" }}>
    {(role === "admin" || role === "teacher") && (
      <button
        onClick={() => setShowNoticeForm(true)}
        style={{
          background: "#f59e0b",
          color: "white",
          borderRadius: "5px",
          padding: "6px 12px",
        }}
      >
        📢 Create Notice
      </button>
    )}
    <button
      onClick={onLogout}
      style={{
        background: "#dc2626",
        color: "white",
        borderRadius: "5px",
        padding: "6px 12px",
      }}
    >
      Logout
    </button>
  </div>
</div>


      {/* ✅ Child Profile */}
      <div className="p-6 flex flex-col items-center">
        <img
          src={
            child.photo
              ? `/${child.photo}`
              : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Child"
          className="w-32 h-32 rounded-full border-4 border-purple-400 object-cover mb-4"
        />
        <h3 className="text-xl font-bold">{child.name}</h3>
        <p className="text-gray-600">
          Class {child.className} - Section {child.section}
        </p>
        <p className="text-gray-500">{child.email}</p>
      </div>

      {/* ✅ Fee Details */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">💰 Fee Status</h3>
        {fees.length === 0 ? (
          <p>No fee records found.</p>
        ) : (
          <ul className="divide-y">
            {fees.map((fee) => (
              <li key={fee._id} className="py-2 flex justify-between">
                <span>{fee.month}</span>
                <span
                  className={
                    fee.status === "paid" ? "text-green-600" : "text-red-500"
                  }
                >
                  {fee.status.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Performance Overview */}
      <div className="px-6 mb-10">
        <h3 className="text-lg font-semibold mb-2">📊 Performance Overview</h3>
        {performance.length === 0 ? (
          <p>No test data yet.</p>
        ) : (
          <ul className="divide-y">
            {performance.map((p) => (
              <li key={p._id} className="py-2">
                <div className="font-semibold">{p.quiz?.name}</div>
                <p>
                  Score: {p.score} / {p.total}
                </p>
                <p className="text-gray-500 text-sm">
                  Date: {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Notices */}
      <div className="px-6 mb-10">
        <h3 className="text-lg font-semibold mb-2">📢 Notices</h3>
        {notices.length === 0 ? (
          <p>No notices.</p>
        ) : (
          <ul className="divide-y">
            {notices.map((n) => (
              <li key={n._id} className="py-2">
                <div className="font-semibold">{n.title}</div>
                <p>{n.message}</p>

                {n.fileUrl && (
                  <a
                    href={`${n.fileUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    📎 View Attachment
                  </a>
                )}

                {n.link && (
                  <a
                    href={n.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-600 underline ml-2"
                  >
                    🔗 Open Link
                  </a>
                )}

                <p className="text-gray-500 text-sm">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
