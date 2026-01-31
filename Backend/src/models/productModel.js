import db from "../config/db.js";

export const getAllProducts = (showDeleted, callback) => {
  let query = "SELECT * FROM products";

  if (!showDeleted) {
    query += " WHERE deleted_at IS NULL";
  }

  db.query(query, callback);
};

export const createProduct = (data, callback) => {
  db.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [data.name, data.price],
    callback
  );
};

export const updateProduct = (id, data, callback) => {
  db.query(
    "UPDATE products SET name=?, price=? WHERE id=? AND deleted_at IS NULL",
    [data.name, data.price, id],
    callback
  );
};

export const softDeleteProduct = (id, callback) => {
  db.query(
    "UPDATE products SET deleted_at = NOW() WHERE id=?",
    [id],
    callback
  );
};

export const restoreProduct = (id, callback) => {
  db.query(
    "UPDATE products SET deleted_at = NULL WHERE id=? AND deleted_at IS NOT NULL",
    [id],
    callback
  );
};
