import multer from "multer";
import path from "path";
import crypto from "crypto";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// ==========================================
// CLOUDINARY CONFIGURATION
// ==========================================

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================================
// CLOUDINARY STORAGE
// ==========================================

const storage = new CloudinaryStorage({
    cloudinary,

    params: async (req, file) => {
        const extension = path
            .extname(file.originalname)
            .toLowerCase();

        const uniqueName = crypto.randomUUID();

        return {
            folder: "imrj/manuscripts",

            // Store PDFs and documents as raw files
            resource_type: "raw",

            // Unique filename with original extension
            public_id: `${uniqueName}${extension}`,

            // Preserve original file format
            format: extension.replace(".", ""),
        };
    },
});

// ==========================================
// FILE VALIDATION
// ==========================================

const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
];

const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const fileFilter = (req, file, cb) => {
    const extension = path
        .extname(file.originalname)
        .toLowerCase();

    const validExtension = allowedExtensions.includes(extension);

    const validMimeType = allowedMimeTypes.includes(file.mimetype);

    if (validExtension && validMimeType) {
        return cb(null, true);
    }

    return cb(
        new Error("Only PDF, DOC and DOCX files are allowed.")
    );
};

// ==========================================
// MULTER CONFIGURATION
// ==========================================

const upload = multer({
    storage,
    fileFilter,

    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 1,
    },
});

export default upload;