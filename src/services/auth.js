// src/services/auth.js
import API from "../api";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export async function login(email, password) {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
}

export async function forgotPassword(email, newPassword) {
  const res = await API.post("/auth/forgot-password", { email, newPassword });
  return res.data;
}
