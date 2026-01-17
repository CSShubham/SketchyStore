import express from "express";
import {
  createOrder,
  myOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/auth.js";

const router = express.Router();

router.use(isAuthenticatedUser);

router.post("/new", createOrder);
router.get("/me", myOrders);
router.get("/:id", getSingleOrder);

// Admin
router.get("/admin/all", authorizeRoles("admin"), getAllOrders);
router.put(
  "/admin/update/:id",
  authorizeRoles("admin"),
  updateOrderStatus
);

export default router;
