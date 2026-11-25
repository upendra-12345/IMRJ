import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
{
submissionId: {
type: String,
unique: true,
required: true,
},

title: {
  type: String,
  required: true,
  trim: true,
},
authorName: {
  type: String,
  required: true,
  trim: true,
},
email: {
  type: String,
  lowercase: true,
  trim: true,
},
phone: {
  type: String,
  trim: true,
},
institution: {
  type: String,
  trim: true,
},
department: {
  type: String,
  trim: true,
},
category: {
  type: String,
  required: true,
},
abstract: {
  type: String,
  required: true,
},
keywords: {
  type: String,
  required: true,
},
// CLOUDINARY MANUSCRIPT FILE
paperFile: {
  originalName: {
    type: String,
    required: true,
  },
  // Cloudinary public ID
  publicId: {
    type: String,
    required: true,
  },
  // Keep storedName for compatibility with existing code
  storedName: {
    type: String,
    required: true,
  },
  // Cloudinary secure URL
  path: {
    type: String,
    required: true,
  },
  // Explicit URL field
  url: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    default: "application/pdf",
  },
  size: {
    type: Number,
  },
  resourceType: {
    type: String,
    default: "raw",
  },
  format: {
    type: String,
    default: "pdf",
  },
},
status: {
  type: String,
  enum: [
    "Pending",
    "Under Review",
    "Revision Required",
    "Accepted",
    "Rejected",
  ],
  default: "Pending",
},
// PUBLICATION INFORMATION
publishedAt: {
  type: Date,
  default: null,
},

},
{
timestamps: true,
}
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;