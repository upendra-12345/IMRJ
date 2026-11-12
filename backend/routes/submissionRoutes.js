import express from "express";

import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  downloadSubmission,
  updateSubmissionStatus,
  getCurrentIssuePapers,
  downloadPublishedPaper,
  getArchivePapers,
} from "../controllers/submissionController.js";

import upload from "../middleware/uploadMiddleware.js";
import protectAdmin from "../middleware/authMiddleware.js";

const router = express.Router();


// ==========================================
// PUBLIC ROUTES
// ==========================================

// Submit research paper
router.post(
  "/",
  upload.single("paper"),
  createSubmission
);

// Current issue papers
router.get(
  "/current-issue",
  getCurrentIssuePapers
);

// All published papers for archives
// No admin authentication required
router.get(
  "/archives",
  getArchivePapers
);

// View current issue PDF
router.get(
  "/current-issue/:id/pdf",
  downloadPublishedPaper
);

// View or download published PDF
router.get(
  "/published/:id/pdf",
  downloadPublishedPaper
);


// ==========================================
// ADMIN ROUTES
// ==========================================

// Get all submissions
router.get(
  "/",
  protectAdmin,
  getAllSubmissions
);

// Download submitted manuscript
router.get(
  "/:id/download",
  protectAdmin,
  downloadSubmission
);

// Update submission status
router.patch(
  "/:id/status",
  protectAdmin,
  updateSubmissionStatus
);

// Get single submission
router.get(
  "/:id",
  protectAdmin,
  getSubmissionById
);

export default router;