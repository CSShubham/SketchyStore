import express from "express";
import {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.use(isAuthenticatedUser);    
router.get("/", getUserWishlist);                 // GET /api/wishlist
router.post("/add", addToWishlist);               // POST /api/wishlist/add
router.delete("/remove/:productId", removeFromWishlist); // DELETE /api/wishlist/remove/:productId      
export default router;