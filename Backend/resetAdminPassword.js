import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB Connected");
};

const resetAdminPassword = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@sketchy.com";
    const newPassword = "Admin12345"; // <-- the password you want to use
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      console.log("❌ Admin user not found!");
      process.exit(1);
    }

    // Update password directly in DB
    await User.updateOne(
      { email: adminEmail },
      { $set: { password: hashedPassword } }
    );

    console.log(`✅ Admin password reset successfully! New password: ${newPassword}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetAdminPassword();
