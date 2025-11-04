// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Notifications from "./pages/NotificationsPage";
import StudyMaterials from "./pages/StudyMaterials";
import Gallery from "./pages/Gallery";
import GalleryEvent from "./pages/GalleryEvent";
import Services from "./pages/Services";
import Achievers from "./pages/Achievers";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ParentDashboard from "./components/ParentDashboard";
import NotificationsPage from "./pages/NotificationsPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const studentData = localStorage.getItem("student");
      const studentToken = localStorage.getItem("studentToken");
      if (studentData && studentToken) {
        const student = JSON.parse(studentData);
        student.token = studentToken;
        setUser(student);
        setLoading(false);
        return;
      }
      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (userData && token) {
        const u = JSON.parse(userData);
        u.token = token;
        setUser(u);
      }
    } catch (err) {
      console.error("Error initializing auth:", err);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (loading)
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      );

    if (!user) return <Navigate to="/login" replace />;

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      switch (user.role) {
        case "student":
          return <Navigate to="/student" replace />;
        case "teacher":
          return <Navigate to="/teacher" replace />;
        case "parent":
          return <Navigate to="/parent" replace />;
        default:
          return <Navigate to="/admin" replace />;
      }
    }
    return children;
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Public Pages */}
        <Route path="/Home" element={<Home />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/study-materials" element={<StudyMaterials />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/gallery/:eventId" element={<GalleryEvent />} />
        <Route path="/services" element={<Services />} />
        <Route path="/achievers" element={<Achievers />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate
                to={
                  user.role === "student"
                    ? "/student"
                    : user.role === "teacher"
                    ? "/teacher"
                    : user.role === "parent"
                    ? "/parent"
                    : "/admin"
                }
                replace
              />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Dashboards */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin", "staff"]}>
              <AdminDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard teacher={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/*"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
