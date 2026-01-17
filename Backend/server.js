import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
// Test Route
app.get("/", (req, res) => {
  res.send("SketchyStore API Running");
});

// Product APIs
app.use("/api/products", productRoutes);

// After product routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
