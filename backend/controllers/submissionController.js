import Submission from "../models/Submission.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

// ==========================================
// CLOUDINARY FILE CLEANUP
// ==========================================

const deleteCloudinaryFile = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    console.log("Cloudinary file deleted:", publicId);
  } catch (error) {
    console.error("Cloudinary cleanup error:", error.message);
  }
};

// ==========================================
// 1. CREATE RESEARCH PAPER SUBMISSION
// ==========================================

const createSubmission = async (req, res) => {
  try {
    const {
      title,
      authorName,
      email,
      phone,
      institution,
      department,
      category,
      abstract,
      keywords,
    } = req.body;

    // ==========================================
    // REQUIRED FIELD VALIDATION
    // ==========================================

    const requiredFields = {
      title,
      authorName,
      category,
      abstract,
      keywords,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (typeof value !== "string" || !value.trim()) {
        await deleteCloudinaryFile(req.file?.filename);

        return res.status(400).json({
          success: false,
          message: `${field} is required.`,
        });
      }
    }

    // ==========================================
    // EMAIL VALIDATION
    // ==========================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email.trim())) {
      await deleteCloudinaryFile(req.file?.filename);

      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // ==========================================
    // FILE VALIDATION
    // ==========================================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload your research paper.",
      });
    }

    // Cloudinary file details
    const cloudinaryUrl = req.file.path;
    const cloudinaryPublicId = req.file.filename;

    if (!cloudinaryUrl || !cloudinaryPublicId) {
      await deleteCloudinaryFile(cloudinaryPublicId);

      return res.status(400).json({
        success: false,
        message: "Manuscript upload failed. Please try again.",
      });
    }

    // ==========================================
    // GENERATE SUBMISSION ID
    // ==========================================

    const submissionId =
      `IMRJ-${new Date().getFullYear()}-${crypto
        .randomUUID()
        .slice(0, 6)
        .toUpperCase()}`;

    // ==========================================
    // SAVE SUBMISSION TO MONGODB
    // ==========================================

    const submission = await Submission.create({
      submissionId,

      title: title.trim(),

      authorName: authorName.trim(),

      email: email?.trim().toLowerCase() || "",

      phone: phone?.trim() || "",

      institution: institution?.trim() || "",

      department: department?.trim() || "",

      category: category.trim(),

      abstract: abstract.trim(),

      keywords: keywords.trim(),

      // ==========================================
      // CLOUDINARY MANUSCRIPT INFORMATION
      // ==========================================

      paperFile: {
        originalName: req.file.originalname,

        // Cloudinary public ID
        publicId: cloudinaryPublicId,

        // Compatibility with existing code
        storedName: cloudinaryPublicId,

        // Cloudinary secure URL
        path: cloudinaryUrl,

        url: cloudinaryUrl,

        mimetype: req.file.mimetype,

        size: req.file.size,

        resourceType: "raw",

        format: req.file.format || "pdf",
      },

      status: "Pending",

      publishedAt: null,
    });

    // ==========================================
    // SUCCESS RESPONSE
    // ==========================================

    return res.status(201).json({
      success: true,

      message: "Research paper submitted successfully!",

      submission: {
        submissionId: submission.submissionId,

        title: submission.title,

        authorName: submission.authorName,

        email: submission.email,

        status: submission.status,

        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    // Delete uploaded file if database save fails
    await deleteCloudinaryFile(req.file?.filename);

    console.error("Submission Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting your paper.",
    });
  }
};

// ==========================================
// 2. GET ALL SUBMISSIONS (ADMIN)
// ==========================================

const getAllSubmissions = async (req, res) => {
  try {
    const {
      status,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    // Filter by status
    if (status && status !== "All") {
      filter.status = status;
    }

    // Search submissions
    if (search) {
      const searchRegex = new RegExp(
        search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "i"
      );

      filter.$or = [
        { title: searchRegex },
        { authorName: searchRegex },
        { email: searchRegex },
        { submissionId: searchRegex },
      ];
    }

    const pageNumber = Math.max(1, Number(page) || 1);

    const pageSize = Math.min(
      100,
      Math.max(1, Number(limit) || 10)
    );

    const total = await Submission.countDocuments(filter);

    const submissions = await Submission.find(filter)
      .select("-paperFile.path")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    return res.status(200).json({
      success: true,

      total,

      currentPage: pageNumber,

      totalPages: Math.ceil(total / pageSize),

      submissions,
    });
  } catch (error) {
    console.error("Get Submissions Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch submissions.",
    });
  }
};

// ==========================================
// 3. GET SINGLE SUBMISSION (ADMIN)
// ==========================================

const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error("Get Submission Error:", error);

    return res.status(400).json({
      success: false,
      message: "Invalid submission ID.",
    });
  }
};

// ==========================================
// 4. DOWNLOAD RESEARCH PAPER (ADMIN)
// ==========================================

const downloadSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }

    const fileUrl = submission.paperFile?.url;

    if (!fileUrl) {
      return res.status(404).json({
        success: false,
        message: "Manuscript URL not found.",
      });
    }

    // Redirect to Cloudinary manuscript
    return res.redirect(fileUrl);
  } catch (error) {
    console.error("Download Submission Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to access manuscript.",
    });
  }
};

// ==========================================
// 5. UPDATE SUBMISSION STATUS (ADMIN)
// ==========================================

const updateSubmissionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Under Review",
      "Revision Required",
      "Accepted",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid submission status.",
      });
    }

    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found.",
      });
    }

    submission.status = status;

    // Automatically publish accepted papers
    if (status === "Accepted") {
      if (!submission.publishedAt) {
        submission.publishedAt = new Date();
      }
    } else {
      submission.publishedAt = null;
    }

    await submission.save();

    return res.status(200).json({
      success: true,

      message:
        status === "Accepted"
          ? "Research paper accepted and published successfully!"
          : "Submission status updated successfully.",

      submission,
    });
  } catch (error) {
    console.error("Update Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update submission status.",
    });
  }
};

// ==========================================
// 6. GET CURRENT ISSUE PAPERS (PUBLIC)
// ==========================================

const getCurrentIssuePapers = async (req, res) => {
  try {
    const papers = await Submission.find({
      status: "Accepted",
      publishedAt: { $ne: null },
    })
      .select("-email -phone -paperFile")
      .sort({ publishedAt: -1 });

    return res.status(200).json({
      success: true,
      count: papers.length,
      papers,
    });
  } catch (error) {
    console.error("Current Issue Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch current issue papers.",
    });
  }
};

// ==========================================
// 7. GET ALL PUBLISHED PAPERS (ARCHIVES)
// ==========================================

const getArchivePapers = async (req, res) => {
  try {
    const papers = await Submission.find({
      status: "Accepted",
      publishedAt: { $ne: null },
    })
      .select("-email -phone -paperFile")
      .sort({ publishedAt: -1 });

    return res.status(200).json({
      success: true,
      count: papers.length,
      papers,
    });
  } catch (error) {
    console.error("Archive Papers Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch publication archives.",
    });
  }
};

// ==========================================
// 8. VIEW / DOWNLOAD PUBLISHED PAPER (PUBLIC)
// ==========================================

const downloadPublishedPaper = async (req, res) => {
  try {
    // Find published paper
    const submission = await Submission.findOne({
      _id: req.params.id,
      status: "Accepted",
      publishedAt: { $ne: null },
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Published paper not found.",
      });
    }

    // Get Cloudinary URL
    const fileUrl = submission.paperFile?.url;

    if (!fileUrl) {
      return res.status(404).json({
        success: false,
        message: "Published paper URL is missing.",
      });
    }

    // Redirect to Cloudinary
    return res.redirect(fileUrl);
  } catch (error) {
    console.error("Published Paper Access Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to access published paper.",
    });
  }
};

// ==========================================
// 9. EXPORT ALL CONTROLLERS
// ==========================================

export {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  downloadSubmission,
  updateSubmissionStatus,
  getCurrentIssuePapers,
  downloadPublishedPaper,
  getArchivePapers,
};