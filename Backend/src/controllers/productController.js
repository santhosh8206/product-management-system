import {
  getAllProducts,
  createProduct,
  updateProduct,
  softDeleteProduct
} from "../models/productModel.js";

export const fetchProducts = (req, res) => {
  const showDeleted = req.query.deleted === "true";

  getAllProducts(showDeleted, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const addProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name and price required" });
  }

  createProduct(req.body, err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Product added successfully" });
  });
};

export const editProduct = (req, res) => {
  updateProduct(req.params.id, req.body, err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Product updated successfully" });
  });
};

export const deleteProduct = (req, res) => {
  softDeleteProduct(req.params.id, err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Product soft deleted" });
  });
};
import { restoreProduct } from "../models/productModel.js";

export const restoreDeletedProduct = (req, res) => {
  restoreProduct(req.params.id, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Product not found or already active"
      });
    }

    res.json({ message: "Product restored successfully" });
  });
};
