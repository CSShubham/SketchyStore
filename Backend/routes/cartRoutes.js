import express from "express";
import {
  getUserCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} from "../controllers/cartController.js";

import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.use(isAuthenticatedUser);

router.get("/", getUserCart);                 // GET /api/cart
router.post("/add", addToCart);               // POST /api/cart/add
router.put("/update", updateCartItem);        // PUT /api/cart/update
router.delete("/remove/:productId", removeFromCart); // DELETE /api/cart/remove/:id

export default router;
