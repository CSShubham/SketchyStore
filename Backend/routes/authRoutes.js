import express from "express";
import { registerUser, loginUser , getMe} from "../controllers/authController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", registerUser); // POST /api/auth/register
router.post("/login", loginUser);       // POST /api/auth/login
router.get("/me", isAuthenticatedUser, getMe);               // GET /api/auth/me

export default router;
// import express from "express";
// import { registerUser, loginUser } from "../controllers/authController.js";
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";

// const router = express.Router();

// // Public routes
// router.post("/register", registerUser); // POST /api/auth/register
// router.post("/login", loginUser);       // POST /api/auth/login

// // ===== TEMPORARY ROUTE =====
// // Create an admin user (REMOVE AFTER TESTING)
// router.post("/create-admin", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if admin already exists
//     const existingAdmin = await User.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ success: false, message: "Admin already exists" });
//     }

//     // Hash the password
//     const hashedPassword = bcrypt.hashSync(password, 10);

//     // Create admin user
//     const adminUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: "admin",
//     });

//     res.status(201).json({ success: true, adminUser });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default router;
