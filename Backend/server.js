import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import cors from "cors";
import morgan from "morgan";
dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173", // Dev frontend
  "https://sketchystore-frontend.vercel.app", // Production frontend (later)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);

// Logger only in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Test Route
app.get("/", (req, res) => {
  res.send("SketchyStore API Running");
});

// Product APIs
app.use("/api/products", productRoutes);

// After product routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/profile", profileRoutes);
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
