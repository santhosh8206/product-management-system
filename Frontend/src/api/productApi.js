import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getProducts = (showDeleted = false) =>
  API.get(`/products?deleted=${showDeleted}`);
export const addProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);

// 🔹 NEW – restore product
export const restoreProduct = (id) =>
  API.put(`/products/${id}/restore`);
