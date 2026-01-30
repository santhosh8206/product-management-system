import express from "express";
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", fetchProducts);
router.post("/products", addProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);

export default router;
