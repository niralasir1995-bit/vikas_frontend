import API from "../api";


const API = import.meta.env.VITE_API_BASE;

const token = () => localStorage.getItem("token");

// Fetch all teachers
export async function getTeachers() {
  const res = await API.get(`/auth/teachers`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
}

// Fetch all students
export async function getStudents() {
  const res = await API.get(`/auth/students`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
}

// Fetch fees summary
export async function getFinance() {
  const res = await API.get(`/reports/finance`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.data;
}
