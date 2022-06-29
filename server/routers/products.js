import express from "express";
import {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updatedProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/allProducts", getAllProducts);

router.post("/", createProduct);

router.get("/:id", getSingleProduct);

router.patch("/:id", updatedProduct);

router.delete("/:id", deleteProduct);

export default router;
