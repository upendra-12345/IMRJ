import express from "express";

import {
  adminLogin,
  updateAdminProfile,
} from "../controllers/authController.js";

import protectAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Get logged-in admin profile
router.get("/profile", protectAdmin, (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
});

// Update admin profile
router.patch("/profile", protectAdmin, updateAdminProfile);

export default router;