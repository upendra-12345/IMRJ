import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Upload directory
const uploadDir = path.resolve("uploads");

// Create folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
        const uniqueName =
            crypto.randomUUID() +
            path.extname(file.originalname).toLowerCase();

        cb(null, uniqueName);
    }
});

// Allowed extensions
const allowedExtensions = [".pdf", ".doc", ".docx"];

// Allowed MIME types
const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

// Validate file
const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const validExtension = allowedExtensions.includes(extension);
    const validMimeType = allowedMimeTypes.includes(file.mimetype);

    if (validExtension && validMimeType) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, DOC and DOCX files are allowed."));
    }
};

// Multer configuration
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
        files: 1
    }
});

export default upload;