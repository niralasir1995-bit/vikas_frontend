import API from "../api";


const API = import.meta.env.VITE_API_BASE;

export async function addQuestion(question, options) {
  const token = localStorage.getItem("token");
  const res = await API.post(API, { question, options }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function getQuestions() {
  const token = localStorage.getItem("token");
  const res = await API.get(API, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function attemptQuestion(id, selectedOption) {
  const token = localStorage.getItem("token");
  const res = await API.post(`/${id}/attempt`, { selectedOption }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
