import db from "../config/db.js";

export const getAllProducts = (callback) => {
  const query = "SELECT * FROM products WHERE deleted_at IS NULL";
  db.query(query, callback);
};

export const createProduct = (data, callback) => {
  const query = "INSERT INTO products (name, price) VALUES (?, ?)";
  db.query(query, [data.name, data.price], callback);
};

export const updateProduct = (id, data, callback) => {
  const query = "UPDATE products SET name=?, price=? WHERE id=?";
  db.query(query, [data.name, data.price, id], callback);
};

export const softDeleteProduct = (id, callback) => {
  const query = "UPDATE products SET deleted_at = NOW() WHERE id=?";
  db.query(query, [id], callback);
};
