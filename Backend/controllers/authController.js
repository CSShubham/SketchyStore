import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    user = await User.create({ name, email, password });

    const token = user.getJWTToken();

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//getMe
export const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email from request:", email);
    console.log("Entered Password:", password);

    const user = await User.findOne({ email }).select("+password");
    console.log("User from DB:", user);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatched = await user.comparePassword(password);
    console.log("Password match result:", isPasswordMatched);
    if (!isPasswordMatched) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = user.getJWTToken();

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
