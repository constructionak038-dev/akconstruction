import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://akconstruction-backend.onrender.com";

export const fetchQuotationsApi = () =>
  axios.get(`${API_URL}/api/quotations`);

export const saveQuotationApi = (data) =>
  axios.post(`${API_URL}/api/quotations`, data);

export const deleteQuotationApi = (id) =>
  axios.delete(`${API_URL}/api/quotations/${id}`);
