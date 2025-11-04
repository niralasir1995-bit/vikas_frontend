// src/api.js
import axios from "axios";

// ✅ Single global Axios instance
const API =  import.meta.env.VITE_API_BASE || "http://localhost:4000/api",
  timeout: 15000,

// ✅ Attach token automatically (if present)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token") || localStorage.getItem("studentToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
