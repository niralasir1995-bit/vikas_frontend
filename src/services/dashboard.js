// src/services/dashboard.js
import API from "../api";


const API = import.meta.env.VITE_API_BASE;

// 📊 Get Student Dashboard
export async function getStudentDashboard(token) {
  try {
    const res = await API.get(`/student`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: "Failed to load student dashboard" };
  }
}

// 👨‍👩‍👦 Parent Dashboard
export async function getParentDashboard(token) {
  try {
    const res = await API.get(`/parent`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: "Failed to load parent dashboard" };
  }
}

// 🛠 Admin Dashboard
export async function getAdminDashboard(token) {
  try {
    const res = await API.get(`/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: "Failed to load admin dashboard" };
  }
}
