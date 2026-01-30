import {
  getAllProducts,
  createProduct,
  updateProduct,
  softDeleteProduct
} from "../models/productModel.js";

export const fetchProducts = (req, res) => {
  getAllProducts((err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

export const addProduct = (req, res) => {
  createProduct(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product added successfully" });
  });
};

export const editProduct = (req, res) => {
  updateProduct(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product updated successfully" });
  });
};

export const deleteProduct = (req, res) => {
  softDeleteProduct(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted (soft delete)" });
  });
};
