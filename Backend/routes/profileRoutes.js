import express from "express";
import {
  getProfile,
  updateName,
  addPhone,
  deletePhone,
  addAddress,
  deleteAddress,
  setDefaultAddress,
} from "../controllers/profileController.js";

import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", isAuthenticatedUser, getProfile); // /api/profile/profile

router.put("/name", isAuthenticatedUser, updateName);// /api/profile/name

router.post("/phone", isAuthenticatedUser, addPhone); // /api/profile/phone
router.delete("/phone/:phoneId", isAuthenticatedUser, deletePhone); // /api/profile/phone/:phoneId

router.post("/address", isAuthenticatedUser, addAddress); // /api/profile/address
router.delete("/address/:addressId", isAuthenticatedUser, deleteAddress); // /api/profile/address/:addressId
router.put(
  "/address/:addressId/default",
  isAuthenticatedUser,
  setDefaultAddress
); // /api/profile/address/:addressId/default

// router.put("/profile/avatar", isAuthenticatedUser, updateAvatar);

export default router;
