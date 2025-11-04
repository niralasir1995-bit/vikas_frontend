// src/api.js
import axios from "axios";

// ✅ Base URL setup
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// ✅ Create an Axios instance
const API = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 15000,
  withCredentials: true,
});

// ✅ Attach token automatically (if present)
API.interceptors.request.use((req) => {
  const token =
    localStorage.getItem("token") || localStorage.getItem("studentToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
