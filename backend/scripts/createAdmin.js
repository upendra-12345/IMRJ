import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

const createAdmin = async () => {
try {
await connectDB();

const {
  ADMIN_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
} = process.env;
// Check environment variables
if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("Admin credentials are missing from .env");
}
const normalizedEmail = ADMIN_EMAIL.trim().toLowerCase();
// Validate password
if (ADMIN_PASSWORD.length < 8) {
  throw new Error(
    "Admin password must contain at least 8 characters."
  );
}
// Hash password
const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
// Check existing admin
let admin = await Admin.findOne({
  email: normalizedEmail,
});
if (admin) {
  admin.name = ADMIN_NAME.trim();
  admin.password = hashedPassword;
  await admin.save();
  console.log("Admin account updated successfully!");
} else {
  admin = await Admin.create({
    name: ADMIN_NAME.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });
  console.log("Admin account created successfully!");
}
console.log("Admin Email:", admin.email);
process.exit(0);

} catch (error) {
console.error("Admin creation failed:", error.message);
process.exit(1);
}
};

createAdmin();