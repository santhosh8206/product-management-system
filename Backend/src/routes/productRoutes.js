import express from "express";
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
  restoreDeletedProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", fetchProducts);
router.post("/products", addProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id/restore", restoreDeletedProduct);
export default router;
