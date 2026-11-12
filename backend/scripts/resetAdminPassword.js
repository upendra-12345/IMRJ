import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const resetPassword = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("Admin email or password missing in .env");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      { $set: { password: hashedPassword } },
      { returnDocument: "after" }
    );

    if (!admin) {
      console.log("Admin account not found. Create it first.");
      process.exit(1);
    }

    console.log("Admin password reset successfully!");
    console.log("Admin Email:", admin.email);

    process.exit(0);
  } catch (error) {
    console.error("Password reset failed:", error.message);
    process.exit(1);
  }
};

resetPassword();