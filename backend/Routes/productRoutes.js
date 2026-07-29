import express from "express";
import {
  createProduct,
  getAllProducts,
  updatedProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", createProduct);
router.get("/", getAllProducts);
router.put("/update/:id", updatedProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
