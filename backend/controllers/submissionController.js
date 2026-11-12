import Submission from "../models/Submission.js";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

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

    const requiredFields = {
      title,
      authorName,
      email,
      phone,
      institution,
      department,
      category,
      abstract,
      keywords,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (typeof value !== "string" || !value.trim()) {
        if (req.file?.path) {
          await fs.unlink(req.file.path).catch(() => {});
        }

        return res.status(400).json({
          success: false,
          message: `${field} is required.`,
        });
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      if (req.file?.path) {
        await fs.unlink(req.file.path).catch(() => {});
      }

      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload your research paper.",
      });
    }

    const submissionId =
      `IMRJ-${new Date().getFullYear()}-${crypto.randomUUID()
        .slice(0, 6)
        .toUpperCase()}`;

    const submission = await Submission.create({
      submissionId,
      title: title.trim(),
      authorName: authorName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      institution: institution.trim(),
      department: department.trim(),
      category: category.trim(),
      abstract: abstract.trim(),
      keywords: keywords.trim(),

      paperFile: {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },

      status: "Pending",
      publishedAt: null,
    });

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
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }

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

    if (status && status !== "All") {
      filter.status = status;
    }

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
    const pageSize = Math.min(100, Math.max(1, Number(limit) || 10));

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

    const filePath = path.resolve(submission.paperFile.path);
    const uploadDirectory = path.resolve("uploads") + path.sep;

    if (!filePath.startsWith(uploadDirectory)) {
      return res.status(403).json({
        success: false,
        message: "Invalid file location.",
      });
    }

    await fs.access(filePath);

    return res.download(
      filePath,
      submission.paperFile.originalName,
      (error) => {
        if (error && !res.headersSent) {
          console.error("Download Error:", error);

          res.status(500).json({
            success: false,
            message: "Unable to download manuscript.",
          });
        }
      }
    );

  } catch (error) {
    console.error("Download Error:", error);

    return res.status(404).json({
      success: false,
      message: "Manuscript file not found.",
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
      .select(
        "-email -phone -paperFile.path -paperFile.storedName"
      )
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
// PUBLIC ROUTE
// ==========================================

const getArchivePapers = async (req, res) => {
  try {
    const papers = await Submission.find({
      status: "Accepted",
      publishedAt: {
        $ne: null,
      },
    })
      .select(
        "-email -phone -paperFile.path -paperFile.storedName"
      )
      .sort({
        publishedAt: -1,
      });

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

    const filePath = path.resolve(submission.paperFile.path);
    const uploadDirectory = path.resolve("uploads") + path.sep;

    if (!filePath.startsWith(uploadDirectory)) {
      return res.status(403).json({
        success: false,
        message: "Invalid file location.",
      });
    }

    await fs.access(filePath);

    const safeFilename = path
      .basename(submission.paperFile.originalName)
      .replace(/["\\\r\n]/g, "_");

    const disposition =
      req.query.download === "true"
        ? "attachment"
        : "inline";

    return res.sendFile(filePath, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          `${disposition}; filename="${safeFilename}"`,
        "X-Content-Type-Options": "nosniff",
      },
    });

  } catch (error) {
    console.error("Published Paper Error:", error);

    return res.status(404).json({
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