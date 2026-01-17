import express from "express";
import {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  createProductReview,
  getAllCategories
} from "../controllers/productController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.get("/category/:category", getProductsByCategory);
router.get("/categories", getAllCategories);
router.get("/", getAllProducts);
router.get("/:id", getProductDetails);


// Reviews (protected)
router.post("/:id/review", isAuthenticatedUser, createProductReview);

// Admin routes (protected)
router.post("/", isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.put("/:id", isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.delete("/:id", isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

export default router;
